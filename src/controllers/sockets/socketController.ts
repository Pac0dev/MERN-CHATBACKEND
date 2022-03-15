const socketController = (socket:any, io:any) => {

	socket.on('room-sent', (payload:any) => {
		const {roomsId = []} = payload;
		socket.join(roomsId);
	});

	socket.on('message-sent', (payload:any) => {
		const {text, roomId, date, username} = payload;
		io.to(roomId).emit('message-sent', {text: text, date, username});
	});
};
export default socketController;
