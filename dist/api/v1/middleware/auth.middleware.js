"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const auth = async (req, res, next) => {
    if (req.headers.authorization) {
        const string = req.headers.authorization.split(" ");
        const token = string.pop();
        const user = await user_model_1.default.findOne({
            token: token,
            deleted: false
        }).select("-password");
        if (!user) {
            res.json({
                code: 400,
                message: "Người dùng không tồn tại"
            });
            return;
        }
        req.user = user;
        next();
    }
    else {
        res.json({
            code: 400,
            message: "Vui lòng gửi token"
        });
    }
};
exports.auth = auth;
