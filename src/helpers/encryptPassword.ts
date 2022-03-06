import bcrypt from 'bcrypt';

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

export {
	encryptPassword,
}
