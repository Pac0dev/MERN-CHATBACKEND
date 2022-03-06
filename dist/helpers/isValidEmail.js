"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = require("../models/dao/UserDao");
const userDao = new UserDao_1.UserDao();
const isValidEmail = (req, res, next) => {
    const email = req.body.email;
    userDao.findByEmail(email).then((result) => {
        if (result === null || result === undefined) {
            next();
        }
        else {
            return res.status(400).json({
                msg: 'The email already exists, use different one',
            });
        }
    })
        .catch((err) => {
        return res.json({
            msg: 'error validating email',
            error: err,
        });
    });
};
exports.default = isValidEmail;
