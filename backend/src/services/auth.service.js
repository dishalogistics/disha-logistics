const UserRepository = require('../repositories/user.repository');
const OTPRepository = require('../repositories/OTPRepository');
const RefreshTokenRepository = require('../repositories/refreshToken.repository');
const { generateAccessToken, generateRefreshToken, hashToken } = require('./token.service');
const { sendOTP } = require('./email.service');
const AppError = require('../utils/AppError');
const roles = require('../constants/roles');

class AuthService {
    async register(userData) {
        const existing = await UserRepository.findByEmail(userData.email);
        if (existing) throw new AppError('Email already registered', 409);

        // Public signup may create business customers or transporters only.
        // Staff roles are created by an administrator, never from this endpoint.
        const role = userData.role === roles.TRANSPORTER ? roles.TRANSPORTER : roles.CUSTOMER;
        const user = await UserRepository.create({ ...userData, role });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await OTPRepository.create({
            email: user.email,
            otp: otpCode,
            purpose: 'REGISTER',
            expiresAt,
        });

        try {
            await sendOTP(user.email, otpCode, 'REGISTER');
        } catch (err) {
            console.error('OTP email error:', err);
            if (process.env.NODE_ENV !== 'production') {
                console.warn(`DEV OTP for ${user.email}: ${otpCode}`);
            }
        }

        return {
            userId: user._id,
            email: user.email,
            ...(process.env.NODE_ENV !== 'production' ? { otpCode } : {}),
        };
    }

    async verifyOTP(email, otp, purpose) {
        const record = await OTPRepository.findLatestOTP(email, purpose);
        if (!record) throw new AppError('Invalid OTP or already verified', 400);
        if (record.expiresAt < new Date()) throw new AppError('OTP expired', 400);

        if (record.otp !== otp) {
            record.attempts += 1;
            if (record.attempts >= 5) {
                await OTPRepository.update(record._id, { verified: true }); // lock
                throw new AppError('Too many attempts, OTP locked', 400);
            }
            await record.save();
            throw new AppError('Invalid OTP', 400);
        }

        if (purpose !== 'RESET_PASSWORD') {
            await OTPRepository.update(record._id, { verified: true });
        }

        if (purpose === 'REGISTER') {
            const user = await UserRepository.findByEmail(email);
            if (user) {
                user.isEmailVerified = true;
                await user.save();
            }
        }

        return { success: true };
    }

    async login(email, password, ip, userAgent) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new AppError('Invalid credentials', 401);
        if (!user.isActive) throw new AppError('Account disabled', 403);
        if (user.isLocked) throw new AppError('Account locked, try later', 403);

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockUntil = new Date(Date.now() + 30 * 60 * 1000);
            }
            await user.save();
            throw new AppError('Invalid credentials', 401);
        }

        user.loginAttempts = 0;
        user.lockUntil = null;
        user.lastLogin = new Date();
        await user.save();

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const hashed = hashToken(refreshToken);

        await RefreshTokenRepository.create({
            user: user._id,
            tokenHash: hashed,
            ipAddress: ip,
            userAgent,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        const userObj = user.toObject();
        delete userObj.password;

        return { accessToken, refreshToken, user: userObj };
    }

    async refresh(refreshToken, ip, userAgent) {
        if (!refreshToken) throw new AppError('Refresh token required', 401);
        const hashed = hashToken(refreshToken);
        const stored = await RefreshTokenRepository.findByHash(hashed);
        if (!stored) throw new AppError('Invalid refresh token', 401);
        if (stored.expiresAt < new Date()) throw new AppError('Refresh token expired', 401);

        const user = await UserRepository.findById(stored.user);
        if (!user || !user.isActive) throw new AppError('User not found or inactive', 401);

        // Revoke old token (rotate)
        await RefreshTokenRepository.revoke(stored._id);

        const newRefreshToken = generateRefreshToken(user);
        const newHashed = hashToken(newRefreshToken);
        await RefreshTokenRepository.create({
            user: user._id,
            tokenHash: newHashed,
            ipAddress: ip,
            userAgent,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        const newAccessToken = generateAccessToken(user);
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    async logout(refreshToken) {
        if (!refreshToken) return { success: true };
        const hashed = hashToken(refreshToken);
        const stored = await RefreshTokenRepository.findByHash(hashed);
        if (stored) {
            await RefreshTokenRepository.revoke(stored._id);
        }
        return { success: true };
    }

    async forgotPassword(email) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new AppError('User not found', 404);

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await OTPRepository.create({
            email,
            otp: otpCode,
            purpose: 'RESET_PASSWORD',
            expiresAt,
        });

        await sendOTP(email, otpCode, 'RESET_PASSWORD').catch(console.error);
        return { success: true };
    }

    async resetPassword(email, otp, newPassword) {
        const record = await OTPRepository.findLatestOTP(email, 'RESET_PASSWORD');
        if (!record) throw new AppError('Invalid OTP', 400);
        if (record.expiresAt < new Date()) throw new AppError('OTP expired', 400);
        if (record.otp !== otp) throw new AppError('Invalid OTP', 400);

        await OTPRepository.update(record._id, { verified: true });

        const user = await UserRepository.findByEmail(email);
        if (!user) throw new AppError('User not found', 404);

        user.password = newPassword;
        user.passwordChangedAt = new Date();
        await user.save();

        return { success: true };
    }

    async changePassword(userId, currentPassword, newPassword) {
        const user = await UserRepository.findByIdWithPassword(userId);
        if (!user) throw new AppError('User not found', 404);

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) throw new AppError('Current password is incorrect', 401);

        user.password = newPassword;
        user.passwordChangedAt = new Date();
        await user.save();

        return { success: true };
    }
}

module.exports = new AuthService();
