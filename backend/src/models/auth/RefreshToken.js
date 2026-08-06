const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        tokenHash: {
            type: String,
            required: true,
            index: true,
        },
        userAgent: String,
        ipAddress: String,
        expiresAt: {
            type: Date,
            required: true,
            index: true,
        },
        isRevoked: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);

refreshTokenSchema.index({ user: 1, isRevoked: 1 });

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);