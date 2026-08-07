const UserRepository = require('../repositories/user.repository');
const roles = require('../constants/roles');
const env = require('../config/env');
const logger = require('../config/logger');

/** Creates the configured first admin once. Existing accounts are never altered. */
async function ensureDefaultAdmin() {
    if (!env.defaultAdminEmail || !env.defaultAdminPassword) {
        logger.warn('Default admin seed skipped: DEFAULT_ADMIN_EMAIL/PASSWORD are not configured');
        return;
    }

    const existing = await UserRepository.findByEmail(env.defaultAdminEmail);
    if (existing) return;

    await UserRepository.create({
        firstName: env.defaultAdminFirstName,
        lastName: env.defaultAdminLastName,
        email: env.defaultAdminEmail,
        password: env.defaultAdminPassword,
        role: roles.SUPER_ADMIN,
        isEmailVerified: true,
        isActive: true,
    });
    logger.info(`Default administrator created for ${env.defaultAdminEmail}`);
}

module.exports = { ensureDefaultAdmin };
