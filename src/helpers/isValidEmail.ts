import express from 'express'
import {UserDao} from '../models/dao/UserDao';
const userDao = new UserDao();
const isValidEmail = (req:express.Request, res:express.Response, next:any) => {
	const email:string = req.body.email;

	userDao.findByEmail(email).then((result) => {
		if(result === null || result === undefined) {
			next();
		} else {
			return res.status(400).json({
				msg: 'The email already exists, use different one',
			});
		}
	})
	.catch((err) => {
		return res.json({
			msg: 'error validating email',
			error: err,
		})
	})
}
export default isValidEmail;
