const OTP = require('../models/auth/OTP');
const BaseRepository = require('./base.repository');

class OTPRepository extends BaseRepository {
    constructor() {
        super(OTP);
    }

    async findUnverifiedOTP(email, purpose) {
        return this.findOne({ email, purpose, verified: false }, '+otp');
    }
}

module.exports = new OTPRepository();