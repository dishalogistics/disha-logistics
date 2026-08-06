const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        env.jwtAccessSecret,
        { expiresIn: env.accessExpire }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        env.jwtRefreshSecret,
        { expiresIn: env.refreshExpire }
    );
};

const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
};