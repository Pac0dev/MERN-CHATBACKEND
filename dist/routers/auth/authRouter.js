"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authControllers_1 = require("../../controllers/auth/authControllers");
const isValidBody_1 = require("../../helpers/isValidBody");
const isValidEmail_1 = __importDefault(require("../../helpers/isValidEmail"));
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'email is a must').not().isEmpty(),
    (0, express_validator_1.check)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.check)('password').not().isEmpty(),
    isValidBody_1.isValidBody
], authControllers_1.login);
router.post('/register', [
    (0, express_validator_1.check)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.check)('password').not().isEmpty(),
    (0, express_validator_1.check)('username').not().isEmpty(),
    isValidEmail_1.default,
    isValidBody_1.isValidBody
], authControllers_1.register);
exports.default = router;
