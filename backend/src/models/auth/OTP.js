const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        otp: {
            type: String,
            required: true,
            select: false,
        },
        purpose: {
            type: String,
            enum: ["REGISTER", "LOGIN", "RESET_PASSWORD"],
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        attempts: {
            type: Number,
            default: 0,
            min: 0,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false },
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
otpSchema.index({ email: 1 });
otpSchema.index({ email: 1, purpose: 1, verified: 1 });

module.exports = mongoose.model("OTP", otpSchema);
