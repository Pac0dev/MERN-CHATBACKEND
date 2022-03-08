import jwt from 'jsonwebtoken';

const getToken = (uid:string) => {
	const payload = {
		uid,
	};
	const token = jwt.sign(payload, process.env.PORT as string, {expiresIn: (3600*2)})
	return token;
}
export default getToken;
