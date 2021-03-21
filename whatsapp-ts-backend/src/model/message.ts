import { Document, model, Schema } from "mongoose";
import { Tables } from "../config/tables";

const messagesSchema = new Schema({
    senderId: {
        required: true,
        ref: Tables.USERS,
        type: Schema.Types.ObjectId
    },
    receiverId: {
        required: true,
        ref: Tables.USERS,
        type: Schema.Types.ObjectId
    },
    message: {
        required: true,
        type: String
    },
    chatRoomId: {
        required: true,
        ref: Tables.CHAT_ROOM,
        type: Schema.Types.ObjectId
    }
}, {
    autoCreate: true,
    timestamps: true
})

export interface IMessageSchema extends Document {
    senderId: string;
    receiverId: string,
    messaage: string
}



export const Message = model<IMessageSchema>(Tables.MESSAGES, messagesSchema)