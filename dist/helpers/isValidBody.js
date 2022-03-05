"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidBody = void 0;
const express_validator_1 = require("express-validator");
const isValidBody = (req, res, next) => {
    const results = (0, express_validator_1.validationResult)(req);
    if (results.isEmpty() === false) {
        return res.status(400).json({
            msg: 'error in body request',
            errors: results.array(),
        });
    }
    ;
    next();
};
exports.isValidBody = isValidBody;
