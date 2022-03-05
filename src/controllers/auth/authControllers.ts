import express from 'express';
import {UserDao} from '../../models/dao/UserDao';
import User from '../../models/User';

const userDao = new UserDao();
const login = async (req:express.Request, res: express.Response) => {

	const username:string = 'test'
	const email:string = req.body.email;
	const password:string = req.body.password;

	const user = new User(username, email, password);

	await userDao.saveUser(user);
	res.json({
		msg: 'done',
	});
}


export {
	login,
};
