import { Request, Response } from "express";
import { Jwt } from "../../../helpers/jwt";
import socket from "../../../socket";
import { AuthUtils } from "./authUtils";

export class AuthController {
    private authUtils: AuthUtils = new AuthUtils()
    private socketUtils = socket;
    public addUser = async (req: Request, res: Response) => {
        try {
            if (res.locals._user) {
                const token = await Jwt.getAuthToken({ _id: res.locals._user._id })
                const result = await this.authUtils.generateLoginPayload(res.locals._user, token)
                return res.status(200).json({ data: result })
            } else {
                const addUser = await this.authUtils.addUser(req.body);
                const token = await Jwt.getAuthToken({ _id: addUser._id })
                const result = await this.authUtils.generateLoginPayload(addUser, token)
                this.socketUtils.emitAddUserSocket(result)
                res.status(200).json({ message: "User Add", data: result });
            }
        } catch (error) {
            console.log('errr', error);
            res.status(500).json({ error: "Failed" });
        }
    }
    public signInUser = async (req: Request, res: Response) => {
        try {
            if (res.locals._user) {
                const token = await Jwt.getAuthToken({ _id: res.locals._user._id })
                const result = await this.authUtils.generateLoginPayload(res.locals._user, token)
                return res.status(200).json({ data: result })
            }
        } catch (error) {
            console.log('errr', error);
            res.status(500).json({ error: "Failed" });
        }
    }
}