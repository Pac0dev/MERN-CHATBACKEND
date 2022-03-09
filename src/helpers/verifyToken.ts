import jwt from 'jsonwebtoken';
import express from 'express';
import {UserDao} from '../models/dao/UserDao';
const verifyToken = async (req:express.Request, res:express.Response, next:any) => {
	const token = req.headers.token;
	const userDao = new UserDao();

	let payload:jwt.JwtPayload;
	try {
		//we need catch the error when token is wrong
		payload = jwt.verify(token as string, process.env.SECRET_SEED as string) as jwt.JwtPayload;
		const {_id} = payload;

		const user = await userDao.findById(_id);
		if(user === null) return res.status(400).json({msg: 'the user is not valid please log again'})

		req.body.user = user;
		next();
	} catch( err ) {
		return res.status(500).json({
			msg: 'error in jwt verifying'
		});
	}
};
export default verifyToken;