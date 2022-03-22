import { Request, Response } from "express";
import ChatDao from "../../models/dao/ChatDao";
import { UserDao } from "../../models/dao/UserDao";

const chatDao = new ChatDao();
const getChannels = async (req: Request, res: Response) => {
    try {
        const channels = await chatDao.getChatsById(req.body.user._id);
		const {username, _id} = req.body.user;
        return res.status(200).json({
            channels,
			user: {username, _id},
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};

const createChannel = (req: Request, res: Response) => {
    const { name, desc, user } = req.body;
    chatDao
        .createChannel(name, desc, user._id)
        .then((channel) => {
            res.json({
                channel,
				user,
            });
        })
        .catch((err) => {
            res.json({
                error: err,
            });
        });
};
const addNewUser = (req: Request, res: Response) => {
    const { userId, channelId} = req.body;
    chatDao
        .addNewUserToChannel({ user: userId }, channelId)
        .then( async (channel) => {
            res.json({
                channel,
            });
        })
        .catch((error) => {
            res.status(500).json({
                msg: "failed to add user: " + userId,
                error,
            });
        });
};

export { addNewUser, createChannel, getChannels };
