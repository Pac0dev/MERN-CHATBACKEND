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
exports.register = exports.login = void 0;
const encryptPassword_1 = require("../../helpers/encryptPassword");
const getToken_1 = __importDefault(require("../../helpers/getToken"));
const UserDao_1 = require("../../models/dao/UserDao");
const User_1 = __importDefault(require("../../models/User"));
const userDao = new UserDao_1.UserDao();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    userDao.login(email, password).then((result) => {
        if (result === null || result === undefined) {
            return res.status(400).json({
                msg: 'User/Password could be wrong',
            });
        }
        const token = (0, getToken_1.default)(result._id, result.username);
        res.json({
            token: token,
            user: result,
        });
    })
        .catch(() => {
        res.json({
            error: 'error trying to login',
        });
    });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, email, password } = req.body;
    let user;
    try {
        password = yield (0, encryptPassword_1.encryptPassword)(password);
    }
    catch (err) {
        res.json({
            error: err
        });
    }
    user = new User_1.default(username, email, password);
    userDao.register(user).then((userInserted) => {
        res.json({
            msg: 'user has been created',
            user: userInserted,
        });
    })
        .catch((err) => {
        res.status(400).json({
            msg: 'error trying to register user',
            error: err,
        });
    });
});
exports.register = register;
