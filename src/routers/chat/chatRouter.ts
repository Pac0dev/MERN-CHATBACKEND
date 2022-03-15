import {Router} from 'express';
import {check} from 'express-validator';
import {getChannels} from '../../controllers/chat/chatController';
import {isValidBody} from '../../helpers/isValidBody';
import verifyToken from '../../helpers/verifyToken';

const router = Router();

router.get('/get-channels', [
	check('token', 'the token is a must').not().isEmpty(),
	verifyToken,
	isValidBody,
], getChannels);

export default router;
