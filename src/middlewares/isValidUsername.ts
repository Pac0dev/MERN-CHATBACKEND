import { Request, Response } from "express";
import { UserDao } from "../models/dao/UserDao";

const userDao = new UserDao();
const isValidUsername = async (req: Request, res: Response, next: any) => {
    const { username } = req.body;

    const userId = await userDao.findByName(username ?? "");

    if (userId === null || userId === undefined) {
        return res.status(400).json({
            message: `user ${username} not found`,
        });
    }

	req.body.userId = userId;
    next();
};

export default isValidUsername;
