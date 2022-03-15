"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const chatController_1 = require("../../controllers/chat/chatController");
const isValidBody_1 = require("../../helpers/isValidBody");
const verifyToken_1 = __importDefault(require("../../helpers/verifyToken"));
const router = (0, express_1.Router)();
router.get('/get-channels', [
    (0, express_validator_1.check)('token', 'the token is a must').not().isEmpty(),
    verifyToken_1.default,
    isValidBody_1.isValidBody,
], chatController_1.getChannels);
exports.default = router;
