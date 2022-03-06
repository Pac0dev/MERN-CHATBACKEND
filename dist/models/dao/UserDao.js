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
exports.UserDao = void 0;
const mongoConfig_1 = require("../../db/mongoConfig");
const collectionName = 'user';
class UserDao {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                try {
                    const userInserted = yield mongoConfig_1.db.collection(collectionName).insertOne(user);
                    return userInserted;
                }
                catch (err) {
                    return err;
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                email: email,
                password: password,
            };
            try {
                const userFound = yield mongoConfig_1.db.collection(collectionName).findOne(query);
                return userFound;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                email: email
            };
            try {
                const userFound = yield mongoConfig_1.db.collection(collectionName).findOne(query);
                return userFound;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.UserDao = UserDao;
