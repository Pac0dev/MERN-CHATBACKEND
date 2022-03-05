import express from 'express';
import {validationResult} from 'express-validator';

export const isValidBody = (req: express.Request, res:express.Response, next:any) => {
	const results = validationResult(req);
	
	if(results.isEmpty() === false) {
		return res.status(400).json({
			msg: 'error in body request',
			errors: results.array(),
		});
	};
	next();
};
