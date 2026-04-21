import mongoose from "mongoose";
import {randomBytes } from "crypto";

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: () => randomBytes(32).toString("hex")
    },
    status: {
        type: String,
        default: "active"
    },
    requestFriends: Array,
    acceptFriends: Array, 
    listFriends: [
        {
            friend_id: String,
            room_chat_id: String
        }
    ],
    statusOnline: String,
    avatar: String,
    createdAt: Date, 
    updatedAt: Date,
    deleted: {
        type: Boolean,
        default: false
    }
});
const User = mongoose.model('User', userSchema, 'user');
export default User;