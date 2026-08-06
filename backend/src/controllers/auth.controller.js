const AuthService = require("../services/auth.service");
const ApiResponse = require("../utils/ApiResponse");
const { setRefreshCookie } = require("../utils/cookie.util");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/user.repository");

exports.register = asyncHandler(async (req, res) => {
    const result = await AuthService.register(req.body);
    ApiResponse.success(
        res,
        "Registration successful. Please verify OTP sent to email.",
        result,
        201,
    );
});

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp, purpose } = req.body;
    const result = await AuthService.verifyOTP(email, otp, purpose);
    ApiResponse.success(res, "OTP verified successfully", result);
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const ip = req.ip;
    const userAgent = req.get("User-Agent");
    const { accessToken, refreshToken, user } = await AuthService.login(
        email,
        password,
        ip,
        userAgent,
    );
    setRefreshCookie(res, refreshToken);
    ApiResponse.success(res, "Login successful", { accessToken, user });
});

exports.refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    const ip = req.ip;
    const userAgent = req.get("User-Agent");
    const { accessToken, refreshToken: newRefreshToken } =
        await AuthService.refresh(refreshToken, ip, userAgent);
    setRefreshCookie(res, newRefreshToken);
    ApiResponse.success(res, "Token refreshed", { accessToken });
});

exports.logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    await AuthService.logout(refreshToken);
    res.clearCookie("refreshToken");
    ApiResponse.success(res, "Logged out successfully");
});

exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    await AuthService.forgotPassword(email);
    ApiResponse.success(res, "OTP sent to email");
});

exports.resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;
    await AuthService.resetPassword(email, otp, newPassword);
    ApiResponse.success(res, "Password reset successful");
});

exports.changePassword = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    await AuthService.changePassword(userId, currentPassword, newPassword);
    ApiResponse.success(res, "Password changed successfully");
});

exports.getMe = asyncHandler(async (req, res) => {
    const user = await UserRepository.findById(req.user.id);
    if (!user) throw new AppError("User not found", 404);
    ApiResponse.success(res, "User profile", user);
});
