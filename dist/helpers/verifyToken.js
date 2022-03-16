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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserDao_1 = require("../models/dao/UserDao");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const userDao = new UserDao_1.UserDao();
    let payload;
    try {
        //we need catch the error when token is wrong
        payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_SEED);
        const { _id } = payload;
        const user = yield userDao.findById(_id);
        if (user === null)
            return res.status(401).json({ msg: 'the user is not valid please log again' });
        req.body.user = user;
        next();
    }
    catch (err) {
        return res.status(500).json({
            msg: 'error in jwt verifying'
        });
    }
});
exports.default = verifyToken;
