"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (uid) => {
    const payload = {
        uid,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.PORT, { expiresIn: (3600 * 2) });
    return token;
};
exports.default = getToken;
