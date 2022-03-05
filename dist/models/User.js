"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    get _username() {
        return this.username;
    }
    get _email() {
        return this.email;
    }
    get _password() {
        return this.password;
    }
    setUsername(username) {
        this.username = username;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
}
exports.default = User;
