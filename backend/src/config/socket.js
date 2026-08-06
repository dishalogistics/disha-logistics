const { Server } = require('socket.io');
const env = require('./env');

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: env.clientUrl,
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
};

module.exports = { initializeSocket, getIO };