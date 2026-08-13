require('dotenv').config();

const nodeEnv = (process.env.NODE_ENV || 'development').trim();

module.exports = {
    nodeEnv: nodeEnv === 'produc' ? 'production' : nodeEnv,
    port: parseInt(process.env.PORT, 10) || 5000,

    mongoUri: process.env.MONGO_URI,

    clientUrl: process.env.CLIENT_URL,

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpire: process.env.ACCESS_TOKEN_EXPIRE || '15m',
    refreshExpire: process.env.REFRESH_TOKEN_EXPIRE || '30d',

    smtpHost: process.env.SMTP_HOST,
    smtpPort: parseInt(process.env.SMTP_PORT, 10) || 587,
    smtpUser: process.env.SMTP_USER,
    smtpPass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
    smtpFrom: process.env.SMTP_FROM,

    logLevel: process.env.LOG_LEVEL || 'info',

    defaultAdminEmail: process.env.DEFAULT_ADMIN_EMAIL,
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    defaultAdminFirstName: process.env.DEFAULT_ADMIN_FIRST_NAME || 'Disha',
    defaultAdminLastName: process.env.DEFAULT_ADMIN_LAST_NAME || 'Administrator',
};
