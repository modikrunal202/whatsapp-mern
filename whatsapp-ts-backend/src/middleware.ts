import { NextFunction, Request, Response } from "express";
import { Jwt } from "./helpers/jwt";
import { User } from "./model/users";

export class Middlewar {
    public getAuthorization = async(req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization) {
            const tokenInfo = Jwt.decodeAuthToken(req.headers.authorization.toString());
            if (tokenInfo) {
                const user = await User.findOne({_id: tokenInfo._id})
                if (user) {
                    res.locals._user = user;
                    next();
                } else {
                    return res.status(401).json({ error: "ERR_UNAUTH" });    
                }
            } else {
                return res.status(401).json({ error: "ERR_UNAUTH" });
            }
        } else {
            return res.status(401).json({ error: "ERR_UNAUTH" });
        }
    }
}