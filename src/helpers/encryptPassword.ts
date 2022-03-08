import bcrypt from 'bcrypt';
import User from '../models/User';

const encryptPassword = (password:string)=> {
	return new Promise((resolve, reject) => {
		const saltRounds = 10;
		bcrypt.genSalt(saltRounds, (err, salt) => {
			if(err !== undefined) {
				reject('error on genSalt method');
			}
			bcrypt.hash(password, salt, (err, encrypted:string) => {
				if(err !== undefined) {
					reject('error trying to hash password');
				}
				resolve(encrypted);
			});
		});
	});
}

const comparePasswords = async (password:string, encryptedPassword:string ):Promise<boolean> => {
	try {
		const match:boolean = await bcrypt.compare(password, encryptedPassword);
		if(match === true) {
			return true;
		}
		return false;
	} catch(err) {
		console.log(err);
		return false;
	}
}

export {
	encryptPassword,
	comparePasswords,
}
