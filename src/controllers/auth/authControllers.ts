import express from 'express';
import {encryptPassword} from '../../helpers/encryptPassword';
import {UserDao} from '../../models/dao/UserDao';
import User from '../../models/User';

const userDao = new UserDao();

const login = (req:express.Request, res: express.Response) => {
	const email:string = req.body.email;
	const password:string = req.body.password;
	
	userDao.login(email, password).then((result) => {
		res.json({
			result: result,
		});
	})
	.catch(() => {
		res.json({
			error: 'error trying to login',
		})
	});
};

const register = async (req:express.Request, res:express.Response) => {
	let {username, email, password} = req.body;

	let user:User;

	try {
		password = await encryptPassword(password);
	} catch( err ) {
		res.json({
			error: err
		});
	}

	user = new User(username, email, password);

	userDao.register(user).then((userInserted) => {
		res.json({
			msg: 'user has been created',
			user: userInserted,
		})
	})
	.catch((err) => {
		res.status(400).json({
			msg: 'error trying to register user',
			error: err,
		})
	});
}


export {
	login,
	register,
};
