import {Router} from 'express';
import {check} from 'express-validator';
import {addNewUser, createChannel, getChannels} from '../../controllers/chat/chatController';
import {isValidBody} from '../../helpers/isValidBody';
import verifyToken from '../../helpers/verifyToken';
import isValidUsername from '../../middlewares/isValidUsername';

const router = Router();

router.get('/get-channels', [
	check('token', 'the token is a must').not().isEmpty(),
	verifyToken,
	isValidBody,
], getChannels);

router.post('/create-channel', [
	check('token', 'the token is a must').not().isEmpty(),
	check('name', 'the name of the channel is a must').not().isEmpty(),
	check('desc', 'the description of the channel is a must').not().isEmpty(),
	verifyToken,
	isValidBody,
], createChannel );

router.put('/update/new-user', [
	check('token', 'the token is a must').not().isEmpty(),
	check('userId', 'the id of the user is a must').not().isEmpty(),
	check('userId', 'the id of the user is not valid').isMongoId(),
	check('channelId', 'channel id is a must').not().isEmpty(),
	check('channelId', 'Not valid mongoID').isMongoId(),
	verifyToken,
	isValidBody,
], addNewUser);

export default router;
