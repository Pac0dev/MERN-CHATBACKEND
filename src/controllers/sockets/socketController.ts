import {UserDao} from "../../models/dao/UserDao";

const usersList:any = {
};
const userDao = new UserDao();
const socketController = (socket:any, io:any) => {

	let userId:string;
	let userRooms:string[];
	let currentUser:any;
	socket.on('room-sent', (payload:any) => {
		const {roomsId = [], user } = payload;
		const {_id, username} = user;

		usersList[`${_id}`] = username;
		userRooms = [...roomsId];
		userId = _id;

		userDao.findById(userId).then((result) => {
			if(result) {
				currentUser = result;
				io.emit('user-connected', user);
			}
		})
		.catch((error ) => console.log(error));

		socket.join([...roomsId, _id ]);
	});



	socket.on('message-sent', (payload:any) => {
		const {text, roomId, date, username} = payload;
		io.to(roomId).emit('message-sent', {text: text, date, username});
	});

	socket.on('disconnect', () => {
		if(userId !== undefined ) {
			console.log(userId, 'has disconnect');
			delete usersList[`${userId}`];
			// socket.to(userRooms).emit('user-logout', {userId: userId});
			socket.emit('user-logout', {userId: userId});
		}
	});
};
export default socketController;
