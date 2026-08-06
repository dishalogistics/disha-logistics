const { body } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');
const roles = require('../constants/roles');

const registerValidation = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role')
        .optional()
        .isIn(Object.values(roles))
        .withMessage('Invalid role'),
    validate,
];

const loginValidation = [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
    validate,
];

const otpValidation = [
    body('email').isEmail().withMessage('Valid email required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
    body('purpose').isIn(['REGISTER', 'LOGIN', 'RESET_PASSWORD']),
    validate,
];

const forgotPasswordValidation = [
    body('email').isEmail().withMessage('Valid email required'),
    validate,
];

const resetPasswordValidation = [
    body('email').isEmail().withMessage('Valid email required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
    body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    validate,
];

const changePasswordValidation = [
    body('currentPassword').notEmpty().withMessage('Current password required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
    validate,
];

module.exports = {
    registerValidation,
    loginValidation,
    otpValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    changePasswordValidation,
};