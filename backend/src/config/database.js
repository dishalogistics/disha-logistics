const mongoose = require('mongoose');
const env = require('./env');
const logger = require('./logger');

const connectDatabase = async () => {
    try {
        await mongoose.connect(env.mongoUri);
        logger.info('MongoDB Connected');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;