const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const {
    registerValidation,
    loginValidation,
    otpValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    changePasswordValidation,
} = require('../validators/auth.validator');

// Public routes
router.post('/register', registerValidation, AuthController.register);
router.post('/verify-otp', otpValidation, AuthController.verifyOTP);
router.post('/login', loginValidation, AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/forgot-password', forgotPasswordValidation, AuthController.forgotPassword);
router.post('/reset-password', resetPasswordValidation, AuthController.resetPassword);

// Protected routes
router.use(authenticate);
router.post('/logout', AuthController.logout);
router.post('/change-password', changePasswordValidation, AuthController.changePassword);
router.get('/me', AuthController.getMe);

// Example admin-only route
router.get('/admin-only', authorize('ADMIN', 'SUPER_ADMIN'), (req, res) => {
    res.json({ message: 'Welcome Admin' });
});

module.exports = router;