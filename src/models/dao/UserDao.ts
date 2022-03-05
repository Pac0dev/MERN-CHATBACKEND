import {db} from "../../db/mongoConfig";
import User from "../User";

interface IUserDao{
	saveUser(user:User):Promise<void>;
}

class UserDao implements IUserDao{
	async saveUser(user: User):Promise<any>  {
		try {
			await db.collection<User>('user').insertOne(user);
		} catch( err ) {
			console.log(err);
		}
	}
}

export {
	UserDao,
}
