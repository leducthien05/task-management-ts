"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const crypto_1 = require("crypto");
const password_1 = require("../../../helper/password");
const register = async (req, res) => {
    const emailRegister = req.body.email;
    const existEmail = await user_model_1.default.findOne({
        email: emailRegister,
        deleted: false
    });
    if (existEmail) {
        res.json({
            code: 100,
            message: "Email đã tồn tại"
        });
        return;
    }
    req.body.password = await (0, password_1.hashPassword)(req.body.password);
    req.body.token = (0, crypto_1.randomBytes)(32).toString("hex");
    const user = new user_model_1.default(req.body);
    await user.save();
    res.cookie("token", user.token);
    res.json({
        code: 200,
        message: "Thêm tài khoản thành công",
        token: user.token
    });
};
exports.register = register;
const login = async (req, res) => {
    const email = req.body.email;
    const user = await user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        res.json({
            code: 100,
            message: "Email không tồn tại"
        });
        return;
    }
    const password = user.password || "";
    const isPassword = await (0, password_1.comparePassword)(req.body.password, password);
    if (!isPassword) {
        res.json({
            code: 100,
            message: "Mật khẩu không đúng"
        });
        return;
    }
    res.cookie("token", user.token);
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: user.token
    });
};
exports.login = login;
const info = async (req, res) => {
    const id = req.params.id.toString();
    const user = await user_model_1.default.findOne({
        _id: id,
        deleted: false
    }).select("-password -token");
    if (!user) {
        res.json({
            code: 100,
            message: "Tài khoản không tồn tại"
        });
        return;
    }
    const reqAny = req;
    reqAny.user = user;
    res.json({
        code: 200,
        message: "Thông tin người dùng",
        user: reqAny.user
    });
};
exports.info = info;
