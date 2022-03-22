"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannels = exports.createChannel = exports.addNewUser = void 0;
const ChatDao_1 = __importDefault(require("../../models/dao/ChatDao"));
const chatDao = new ChatDao_1.default();
const getChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield chatDao.getChatsById(req.body.user._id);
        const { username, _id } = req.body.user;
        return res.status(200).json({
            channels,
            user: { username, _id },
        });
    }
    catch (err) {
        res.status(500).json({
            error: err,
        });
    }
});
exports.getChannels = getChannels;
const createChannel = (req, res) => {
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
exports.createChannel = createChannel;
const addNewUser = (req, res) => {
    const { userId, channelId } = req.body;
    chatDao
        .addNewUserToChannel({ user: userId }, channelId)
        .then((channel) => __awaiter(void 0, void 0, void 0, function* () {
        res.json({
            channel,
        });
    }))
        .catch((error) => {
        res.status(500).json({
            msg: "failed to add user: " + userId,
            error,
        });
    });
};
exports.addNewUser = addNewUser;
