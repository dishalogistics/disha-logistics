class ApiResponse {
    static success(res, message, data = null, status = 200) {
        return res.status(status).json({
            success: true,
            message,
            data,
        });
    }

    static error(res, message, status = 500, errors = null) {
        return res.status(status).json({
            success: false,
            message,
            errors,
        });
    }
}

module.exports = ApiResponse;