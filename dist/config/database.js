"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        const uri = process.env.MONGO_URI || "not";
        if (!uri) {
            throw new Error("MONGO_URI is missing in .env");
        }
        console.log(uri);
        await mongoose_1.default.connect(uri);
        console.log("connect Success");
    }
    catch (error) {
        console.log("Error");
    }
};
exports.connect = connect;
