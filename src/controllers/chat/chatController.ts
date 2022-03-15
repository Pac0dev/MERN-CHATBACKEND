import {Request, Response} from 'express';
import ChatDao from '../../models/dao/ChatDao';

const getChannels = async (req:Request, res:Response) => {
	const chatDao = new ChatDao();

	try {
		const channels = await chatDao.getChatsById(req.body.user._id);
		return res.status(200).json({
			channels,
		})
	} catch ( err ) {
		res.status(500).json({
			error: err,
		});
	}
}
export {
	getChannels,
}
