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
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = require("../models/dao/UserDao");
const userDao = new UserDao_1.UserDao();
const isValidUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const userId = yield userDao.findByName(username !== null && username !== void 0 ? username : "");
    if (userId === null || userId === undefined) {
        return res.status(400).json({
            message: `user ${username} not found`,
        });
    }
    req.body.userId = userId;
    next();
});
exports.default = isValidUsername;
