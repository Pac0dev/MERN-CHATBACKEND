import { ObjectId } from "mongodb";
import { db } from "../../db/mongoConfig";

const collectionName = "channel";
interface IChatDao {
    getChatsById(id: string): Promise<any>;
}

class ChatDao implements IChatDao {
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
