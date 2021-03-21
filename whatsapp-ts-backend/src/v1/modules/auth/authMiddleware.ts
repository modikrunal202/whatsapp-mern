import { NextFunction, Request, Response } from "express";
import { Jwt } from "../../../helpers/jwt";
import { AuthUtils } from "./authUtils";

export class AuthMiddleware {
    private authUtils: AuthUtils = new AuthUtils();
    public isUserExists = async (req: Request, res: Response, next: NextFunction) => {
        const isUser: any = await this.authUtils.isUserExists(req.body);
        if (isUser) {
            res.locals._user = isUser
            next()
        } else {
            next();
        }
    }
}