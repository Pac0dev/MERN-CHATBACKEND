import express from 'express';
import dotenv from 'dotenv';
import router from '../routers/auth/authRouter';
import {connectMongo} from '../db/mongoConfig';
import cors from 'cors';
dotenv.config();

class Server {
	app:express.Express;
	PORT:string;
	paths:{
		authPath:string,
	}
	constructor() {
		this.app = express(); 
		this.PORT = process.env.PORT || '8080';
		this.paths = {
			authPath: '/api/auth',
		};
		this.dbInit();
		this.routes();
	}
	init() {
		this.app.listen(this.PORT, () => {
			console.log('running server at', this.PORT);
		});
	}
	async dbInit():Promise<void> {
		await connectMongo();
	}
	routes() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(this.paths.authPath, router);
	}
}
export default Server;
