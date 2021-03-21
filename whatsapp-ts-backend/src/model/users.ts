import { Document, model, Schema } from "mongoose";
import { Tables } from "../config/tables";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    autoCreate: true,
    timestamps: true
})

export interface IUserSchema extends Document {
    name: string,
    email: string
}

export const User = model<IUserSchema>(Tables.USERS, userSchema)