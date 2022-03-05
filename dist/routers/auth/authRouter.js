"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authControllers_1 = require("../../controllers/auth/authControllers");
const isValidBody_1 = require("../../helpers/isValidBody");
const router = (0, express_1.Router)();
router.get('/login', [
    (0, express_validator_1.check)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.check)('password').not().isEmpty(),
    isValidBody_1.isValidBody
], authControllers_1.login);
exports.default = router;
