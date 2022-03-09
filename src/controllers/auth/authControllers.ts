import express from 'express';
import {encryptPassword} from '../../helpers/encryptPassword';
import getToken from '../../helpers/getToken';
import {UserDao} from '../../models/dao/UserDao';
import User from '../../models/User';

const userDao = new UserDao();

const login = async (req:express.Request, res: express.Response) => {
	const email:string = req.body.email;
	const password:string = req.body.password;
	
	userDao.login(email, password).then((result) => {
		if(result === null || result === undefined) {
			return res.status(400).json({
				msg: 'User/Password could be wrong',
			});
		}
		const token = getToken(result._id);
		res.json({
			token: token,
			user: result,
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
