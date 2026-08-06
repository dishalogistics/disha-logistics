const logger = require('../config/logger');
const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof AppError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        error = new AppError(message, statusCode);
    }
    logger.error(`${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(error.statusCode).json({
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
};

module.exports = errorHandler;