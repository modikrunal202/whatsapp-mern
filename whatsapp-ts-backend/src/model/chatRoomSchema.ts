import { Document, model, Schema } from "mongoose";
import { Tables } from "../config/tables";

const chatRoomSchema = new Schema({
    userIds: [{
        ref: Tables.USERS,
        type: Schema.Types.ObjectId
    }],
}, {
    timestamps: true,
    autoCreate: true
})



chatRoomSchema.methods.getAvailableRoom = async function (userIds) {
    try {
        const query = {
            userIds: {
                $all: [...userIds]
            }
        }
        const availableRoom = await this.model(Tables.CHAT_ROOM).findOne(query);
        if (availableRoom) {
            return {
                isNew: false,
                chatRoomId: availableRoom._doc._id
            }
        } else {
            const newRoom = await this.model(Tables.CHAT_ROOM).create({ userIds });
            return {
                isNew: true,
                chatRoomId: newRoom._doc._id,
            };

        }
    } catch (error) {
        console.error("Errror")
        throw error;
    }
}

export interface IChatRoomSchema extends Document {
    userIds: [string],
    getAvailableRoom: (userIds) => any;
}
// interface IChatAvailable extends IChatRoomSchema, Document {
// }

export const ChatRoom = model<IChatRoomSchema>(Tables.CHAT_ROOM, chatRoomSchema)