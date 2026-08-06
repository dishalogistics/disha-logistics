const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/AppError');
const UserRepository = require('../repositories/user.repository');

const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in', 401));
    }

    try {
        const decoded = jwt.verify(token, env.jwtAccessSecret);
        const user = await UserRepository.findById(decoded.id);
        if (!user || !user.isActive) {
            return next(new AppError('User not found or inactive', 401));
        }

        // Check if password changed after token issuance
        if (user.passwordChangedAt) {
            const changedTime = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
            if (changedTime > decoded.iat) {
                return next(new AppError('Password recently changed, please login again', 401));
            }
        }

        req.user = { id: user._id, role: user.role };
        next();
    } catch (error) {
        return next(new AppError('Invalid token', 401));
    }
};

module.exports = { authenticate };