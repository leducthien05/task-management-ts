"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = require("crypto");
const userSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: () => (0, crypto_1.randomBytes)(32).toString("hex")
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
const User = mongoose_1.default.model('User', userSchema, 'user');
exports.default = User;
