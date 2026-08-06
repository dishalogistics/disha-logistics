const http = require('http');
const app = require('./app');
const connectDatabase = require('./config/database');
const { initializeSocket } = require('./config/socket');
const env = require('./config/env');
const logger = require('./config/logger');

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

const startServer = async () => {
    await connectDatabase();

    server.listen(env.port, () => {
        logger.info(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
    });
};

startServer();

process.on('SIGINT', () => {
    logger.info('Server shutting down (SIGINT)');
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Server shutting down (SIGTERM)');
    process.exit(0);
});