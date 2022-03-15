import express from "express";
import dotenv from "dotenv";
import authRouter from "../routers/auth/authRouter";
import chatRouter from "../routers/chat/chatRouter";
import { connectMongo } from "../db/mongoConfig";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import socketController from "../controllers/sockets/socketController";
dotenv.config();

class ServerModel {
    //servers and socket
    app: express.Express;
    httpServer: http.Server;
    io: any;

    PORT: string;
    paths: {
        authPath: string;
        chatPath: string;
    };
    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer, {
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
    async dbInit(): Promise<void> {
        await connectMongo();
    }
    routes() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(this.paths.authPath, authRouter);
        this.app.use(this.paths.chatPath, chatRouter);
    }
    sockets() {
		this.io.on('connection', (socket:any) => socketController(socket, this.io));
    }
}
export default ServerModel;
