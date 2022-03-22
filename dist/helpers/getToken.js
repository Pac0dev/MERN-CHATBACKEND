"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (_id, username) => {
    const payload = {
        "_id": _id,
        "username": username,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_SEED, {
        expiresIn: 3600 * 2,
    });
    return token;
};
exports.default = getToken;
