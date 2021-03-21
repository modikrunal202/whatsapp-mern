import { Request, Response } from "express"
import { ChatUtils } from "./chatUtils"

export class ChatController {
    private chatUtils: ChatUtils = new ChatUtils()
    public sendMessage = async(req: Request, res: Response) => {
        const sendMessage = await this.chatUtils.sendMessage(req.body);
        res.status(200).json({messge: "DONE"})
    }
    public getMessages = async(req: Request, res: Response) => {
        const data = await this.chatUtils.getMessages(req.params.id, res.locals._user._id);
        res.status(200).json({messge: "DONE", data})
    }
}