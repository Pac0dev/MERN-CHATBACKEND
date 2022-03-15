import {ObjectID} from "bson";
import {db} from "../../db/mongoConfig";
import {comparePasswords} from "../../helpers/encryptPassword";
import User from "../User";

interface IUserDao{
	register(user:User):Promise<any>;
	login(email:string, password:string):Promise<any>;
	findByEmail(email:string):Promise<any>;
	findById(id:string):Promise<any>;
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
			return err;
		}
	}
	async login(email:string, password:string):Promise<any> {
		try {
			//we find the user by email
			const userFound = await db.collection(collectionName).findOne({email: email});
			let match:boolean;
			if(userFound !== null) {
				//this function compare the password sent in body with the user found with email
				match = await comparePasswords(password, userFound.password); 
				if(match === true ) {
					return userFound;
				}
			}
			return null;
		} catch ( err ) {
			return err;
		}
	}
	async findByEmail(email:string):Promise<any>{
		const query = {
			email: email
		};

		try {
			const userFound = await db.collection(collectionName).findOne(query);
			return userFound?.email;
		} catch( err ) {
			return err;
		}
	}
	async findById(id:string):Promise<any> {
		const query = {
			"_id": new ObjectID(id),
		};
		try {
			const userFound = await db.collection(collectionName).findOne(query);
			return userFound;
		} catch ( err ) {
			return err;
		}
	}
}

export {
	UserDao,
}
