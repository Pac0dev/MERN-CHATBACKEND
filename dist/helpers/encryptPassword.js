"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt_1.default.genSalt(saltRounds, (err, salt) => {
            if (err !== undefined) {
                reject('error on genSalt method');
            }
            bcrypt_1.default.hash(password, salt, (err, encrypted) => {
                if (err !== undefined) {
                    reject('error trying to hash password');
                }
                resolve(encrypted);
            });
        });
    });
};
exports.encryptPassword = encryptPassword;
