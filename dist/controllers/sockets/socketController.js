"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketController = (socket, io) => {
    socket.on('room-sent', (payload) => {
        const { roomsId = [] } = payload;
        socket.join(roomsId);
    });
    socket.on('message-sent', (payload) => {
        const { text, roomId, date, username } = payload;
        io.to(roomId).emit('message-sent', { text: text, date, username });
    });
};
exports.default = socketController;
