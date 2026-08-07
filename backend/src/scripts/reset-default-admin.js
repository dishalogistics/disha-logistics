require('dotenv').config();
const mongoose = require('mongoose');
const env = require('../config/env');
const User = require('../models/auth/User');
const roles = require('../constants/roles');

async function resetDefaultAdmin() {
    if (!env.defaultAdminEmail || !env.defaultAdminPassword) {
        throw new Error('DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD must be configured');
    }
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 10000 });
    let user = await User.findOne({ email: env.defaultAdminEmail }).select('+password');
    if (user) {
        user.firstName = env.defaultAdminFirstName;
        user.lastName = env.defaultAdminLastName;
        user.role = roles.SUPER_ADMIN;
        user.isActive = true;
        user.isEmailVerified = true;
        user.password = env.defaultAdminPassword;
        await user.save();
        console.log(`Default Super Admin reset: ${env.defaultAdminEmail}`);
    } else {
        await User.create({
            firstName: env.defaultAdminFirstName,
            lastName: env.defaultAdminLastName,
            email: env.defaultAdminEmail,
            password: env.defaultAdminPassword,
            role: roles.SUPER_ADMIN,
            isActive: true,
            isEmailVerified: true,
        });
        console.log(`Default Super Admin created: ${env.defaultAdminEmail}`);
    }
    await mongoose.disconnect();
}

resetDefaultAdmin().catch(async (error) => {
    console.error('Admin seed failed:', error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
});
