import {db} from "../../db/mongoConfig";
import User from "../User";

interface IUserDao{
	register(user:User):Promise<any>;
	login(email:string, password:string):Promise<any>;
	findByEmail(email:string):Promise<any>;
}

const collectionName = 'user';

class UserDao implements IUserDao{
	async register(user: User):Promise<any>  {
		try {
			try {
				const userInserted = await db.collection<User>(collectionName).insertOne(user);
				return userInserted;
			} catch( err ) {
				return err;
			}
		} catch( err ) {
			console.log(err);
		}
	}
	async login(email:string, password:string):Promise<any> {
		const query = {
			email: email,
			password: password,
		};
		try {
			const userFound = await db.collection(collectionName).findOne(query);
			return userFound;
		} catch ( err ) {
			console.log(err);
			return err;
		}
	}
	async findByEmail(email:string):Promise<any>{
		const query = {
			email: email
		};

		try {
			const userFound = await db.collection(collectionName).findOne(query);
			return userFound;
		} catch( err ) {
			return err;
		}
	}
}

export {
	UserDao,
}
