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
const bson_1 = require("bson");
const mongoConfig_1 = require("../../db/mongoConfig");
const encryptPassword_1 = require("../../helpers/encryptPassword");
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
                return err;
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //we find the user by email
                const userFound = yield mongoConfig_1.db.collection(collectionName).findOne({ email: email });
                let match;
                if (userFound !== null) {
                    //this function compare the password sent in body with the user found with email
                    match = yield (0, encryptPassword_1.comparePasswords)(password, userFound.password);
                    if (match === true) {
                        return userFound;
                    }
                }
                return null;
            }
            catch (err) {
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
                return userFound === null || userFound === void 0 ? void 0 : userFound.email;
            }
            catch (err) {
                return err;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                "_id": new bson_1.ObjectID(id),
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
