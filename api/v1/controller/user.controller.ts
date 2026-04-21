import { Request, Response } from "express";
import User from "../model/user.model";

import { randomBytes } from "crypto";
import { hashPassword, comparePassword } from "../../../helper/password";

export const register = async (req: Request, res: Response)=>{
    const emailRegister: string = req.body.email;
    const existEmail = await User.findOne({
        email: emailRegister,
        deleted: false
    });
    if(existEmail){
        res.json({
            code: 100,
            message: "Email đã tồn tại"
        });
        return;
    }
    req.body.password = await hashPassword(req.body.password);
    req.body.token = randomBytes(32).toString("hex");
    const user = new User(req.body);
    await user.save();
    res.cookie("token", user.token);
    res.json({
        code: 200,
        message: "Thêm tài khoản thành công",
        token: user.token
    });
}

export const login = async (req: Request, res: Response)=>{
    const email: string = req.body.email;
    const user = await User.findOne({
        email: email,
        deleted: false
    });
    if(!user){
        res.json({
            code: 100,
            message: "Email không tồn tại"
        });
        return;
    }
    const password: string = user.password || "";
    const isPassword = await comparePassword(req.body.password, password);
    if(!isPassword){
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
}

export const info = async (req: Request, res: Response)=>{
    const id: string = req.params.id.toString();
    const user = await User.findOne({
        _id: id,
        deleted: false
    }).select("-password -token");
    if(!user){
        res.json({
            code: 100,
            message: "Tài khoản không tồn tại"
        });
        return;
    }
    res.json({
        code: 200,
        message: "Thông tin người dùng",
        user: user
    });
}