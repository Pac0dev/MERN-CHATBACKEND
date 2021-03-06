"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoConfig_1 = require("../../db/mongoConfig");
const collectionName = "channel";
class ChatDao {
    addNewUserToChannel(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                _id: new mongodb_1.ObjectId(id)
            };
            const updatedField = {
                $push: { users: user }
            };
            try {
                const updatedChannel = yield mongoConfig_1.db.collection(collectionName).updateOne(query, updatedField);
                return updatedChannel;
            }
            catch (err) {
                return err;
            }
        });
    }
    createChannel(name, desc, id) {
        const channel = {
            name,
            desc,
            users: [{ user: new mongodb_1.ObjectId(id) }]
        };
        return new Promise((resolve, reject) => {
            mongoConfig_1.db.collection(collectionName).insertOne(channel, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    }
    getChatsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channels = mongoConfig_1.db.collection(collectionName).aggregate([
                    {
                        $match: {
                            "users.user": new mongodb_1.ObjectId(id)
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
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
}
exports.default = ChatDao;
