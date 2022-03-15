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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRouter_1 = __importDefault(require("../routers/auth/authRouter"));
const chatRouter_1 = __importDefault(require("../routers/chat/chatRouter"));
const mongoConfig_1 = require("../db/mongoConfig");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socketController_1 = __importDefault(require("../controllers/sockets/socketController"));
dotenv_1.default.config();
class ServerModel {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: "*",
            },
        });
        this.PORT = process.env.PORT || "8080";
        this.paths = {
            authPath: "/api/auth",
            chatPath: "/api/chat",
        };
        this.dbInit();
        this.routes();
        this.sockets();
    }
    init() {
        this.httpServer.listen(this.PORT, () => {
            console.log("running server at", this.PORT);
        });
    }
    dbInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, mongoConfig_1.connectMongo)();
        });
    }
    routes() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(this.paths.authPath, authRouter_1.default);
        this.app.use(this.paths.chatPath, chatRouter_1.default);
    }
    sockets() {
        this.io.on('connection', (socket) => (0, socketController_1.default)(socket, this.io));
    }
}
exports.default = ServerModel;
