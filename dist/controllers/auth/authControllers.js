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
exports.login = void 0;
const UserDao_1 = require("../../models/dao/UserDao");
const User_1 = __importDefault(require("../../models/User"));
const userDao = new UserDao_1.UserDao();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = 'test';
    const email = req.body.email;
    const password = req.body.password;
    const user = new User_1.default(username, email, password);
    yield userDao.saveUser(user);
    res.json({
        msg: 'done',
    });
});
exports.login = login;
