import { Request, Response } from "express";
import { ChatRoom } from "../../../model/chatRoomSchema";
import { Message } from "../../../model/message";
import { database } from "../../../database"
export class ChatUtils {
    private chatRoom = new ChatRoom()
    public async sendMessage(message: any) {
        try {
            console.log('message.chatRoomId',message);
            if (!message.chatRoomId) {
                const userIds = [message.senderId, message.receiverId]
                const chatroomResult = await this.chatRoom.getAvailableRoom(userIds)
                // console.log('respppp', chatroomResult);
                message.chatRoomId = chatroomResult.chatRoomId
            }
            const result = await Message.create(message);
            // console.log('result', result);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    public async getMessages(senderId, receiverId) {
        try {
            const userIds = [senderId, receiverId]
            const chatroomResult = await this.chatRoom.getAvailableRoom(userIds)
            // console.log('respppp', chatroomResult);
            const result = await Message.find({chatRoomId: chatroomResult.chatRoomId});
            // console.log('result', result);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}