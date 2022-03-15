import {Router, request, response} from 'express';
import {check} from 'express-validator';
import {login, register} from '../../controllers/auth/authControllers';
import {isValidBody} from '../../helpers/isValidBody';
import isValidEmail from '../../helpers/isValidEmail';
import verifyToken from '../../helpers/verifyToken';

const router = Router();

router.post('/login', [
	check('email').isEmail().normalizeEmail(),
	check('password').not().isEmpty(),
	isValidBody
], login);

router.post('/register', [
	check('email').isEmail().normalizeEmail(),
	check('password').not().isEmpty(),
	check('username').not().isEmpty(),
	isValidEmail,
	isValidBody
], register);


export default router;
