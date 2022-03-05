import {Router} from 'express';
import {check} from 'express-validator';
import {login} from '../../controllers/auth/authControllers';
import {isValidBody} from '../../helpers/isValidBody';

const router = Router();

router.get('/login', [
	check('email').isEmail().normalizeEmail(),
	check('password').not().isEmpty(),
	isValidBody
], login);

export default router;
