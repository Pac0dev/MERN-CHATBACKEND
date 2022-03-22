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
		if(user === null) return res.status(401).json({msg: 'the user is not valid please log again'})

		req.body.user = user;
		next();
	} catch( err ) {
		return res.status(500).json({
			msg: 'error in jwt verifying'
		});
	}
};

const getIdByToken = (token:string) => {
	try {
		const payload = jwt.verify(token, process.env.SECRET_SEED as string) as jwt.JwtPayload;
		if(payload._id) {
			return payload._id;
		}
		return -1;
	} catch ( err ) {
		console.log(err);
	}
}

export {
	getIdByToken,
}

export default verifyToken;
