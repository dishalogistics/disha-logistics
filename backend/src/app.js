const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index.routes');
const errorMiddleware = require('./middlewares/error.middleware');
const notFound = require('./middlewares/notFound.middleware');
// const rateLimiter = require('./middlewares/rateLimiter.middleware');
const requestLogger = require('./middlewares/requestLogger.middleware');
const env = require('./config/env');

const app = express();

// Security
app.use(helmet());
app.use(
    cors({
        origin: env.clientUrl,
        credentials: true,
    })
);
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Logging
app.use(requestLogger);

// Rate limiting
// app.use(rateLimiter);

// Routes
app.use('/api/v1', routes);

// 404
app.use(notFound);

// Global error handler
app.use(errorMiddleware);

module.exports = app;