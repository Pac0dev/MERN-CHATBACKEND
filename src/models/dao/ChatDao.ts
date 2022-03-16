import { ObjectId } from "mongodb";
import { db } from "../../db/mongoConfig";

const collectionName = "channel";
interface IChatDao {
    getChatsById(id: string): Promise<any>;
	createChannel(name:string, desc:string, id:string): Promise<any>;
	addNewUserToChannel(user:any, id:string):Promise<any>;
}

class ChatDao implements IChatDao {
	async addNewUserToChannel(user: any, id:string): Promise<any> {
		const query = {
			_id: new ObjectId(id)
		};

		const updatedField = {
			$push: {users: user}
		};

		try {
			const updatedChannel = await db.collection(collectionName).updateOne(query, updatedField );
			return updatedChannel;
		} catch( err ) {
			return err;
		}
	}
	async createChannel(name: string, desc: string, id:string): Promise<any> {
		const channel = {
			name,
			desc,
			users: [{user: new ObjectId(id)}]
		};
		try {
			 const newChannel = await db.collection(collectionName).insertOne(channel);
			 return newChannel;
		} catch ( err ) {
			return err;
		}		
	}
    async getChatsById(id: string): Promise<any> {
        try {
            const channels = db.collection(collectionName).aggregate([
                {
                    $match: {
						"users.user": new ObjectId(id)
                    },
                },
                {
                    $lookup: {
                        from: "user",
                        localField: "users.user",
                        foreignField: "_id",
                        as: "users",
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        channelDescription: { $first: "$channelDescription" },
                        users: { $first: "$users" },
                    },
                },
            ]);

            return channels.toArray();
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

export default ChatDao;
