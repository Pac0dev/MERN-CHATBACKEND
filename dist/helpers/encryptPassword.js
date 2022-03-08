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
exports.comparePasswords = exports.encryptPassword = void 0;
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
const comparePasswords = (password, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield bcrypt_1.default.compare(password, encryptedPassword);
        if (match === true) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.comparePasswords = comparePasswords;
