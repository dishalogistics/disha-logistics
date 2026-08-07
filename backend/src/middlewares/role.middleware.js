const AppError = require('../utils/AppError');

const authorize = (...allowedRoles) => {
    return function roleAuthorization(req, res, next) {
        if (!req.user) return next(new AppError('Unauthorized', 401));
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError('You do not have permission', 403));
        }
        return next();
    };
};

module.exports = { authorize };
