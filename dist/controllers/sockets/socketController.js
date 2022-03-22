"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = require("../../models/dao/UserDao");
const usersList = {};
const userDao = new UserDao_1.UserDao();
const socketController = (socket, io) => {
    let userId;
    let userRooms;
    let currentUser;
    socket.on('room-sent', (payload) => {
        const { roomsId = [], user } = payload;
        const { _id, username } = user;
        usersList[`${_id}`] = username;
        userRooms = [...roomsId];
        userId = _id;
        userDao.findById(userId).then((result) => {
            if (result) {
                currentUser = result;
                io.emit('user-connected', user);
            }
        })
            .catch((error) => console.log(error));
        socket.join([...roomsId, _id]);
    });
    socket.on('message-sent', (payload) => {
        const { text, roomId, date, username } = payload;
        io.to(roomId).emit('message-sent', { text: text, date, username });
    });
    socket.on('disconnect', () => {
        if (userId !== undefined) {
            console.log(userId, 'has disconnect');
            delete usersList[`${userId}`];
            // socket.to(userRooms).emit('user-logout', {userId: userId});
            socket.emit('user-logout', { userId: userId });
        }
    });
};
exports.default = socketController;
