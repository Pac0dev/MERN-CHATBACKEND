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
router.post('/create-channel', [
    (0, express_validator_1.check)('token', 'the token is a must').not().isEmpty(),
    (0, express_validator_1.check)('name', 'the name of the channel is a must').not().isEmpty(),
    (0, express_validator_1.check)('desc', 'the description of the channel is a must').not().isEmpty(),
    verifyToken_1.default,
    isValidBody_1.isValidBody,
], chatController_1.createChannel);
router.put('/update/new-user', [
    (0, express_validator_1.check)('token', 'the token is a must').not().isEmpty(),
    (0, express_validator_1.check)('userId', 'the id of the user is a must').not().isEmpty(),
    (0, express_validator_1.check)('userId', 'the id of the user is not valid').isMongoId(),
    (0, express_validator_1.check)('channelId', 'channel id is a must').not().isEmpty(),
    (0, express_validator_1.check)('channelId', 'Not valid mongoID').isMongoId(),
    verifyToken_1.default,
    isValidBody_1.isValidBody,
], chatController_1.addNewUser);
exports.default = router;
