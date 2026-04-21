import { Request, Response, NextFunction } from "express";
import User from "../model/user.model";

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    if (req.headers.authorization) {
            const string = req.headers.authorization.split(" ");
            const token = string.pop();
            const user = await User.findOne({
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
            (req as any).user = user;
            next();
        } else {
            res.json({
                code: 400,
                message: "Vui lòng gửi token"
            });
        }
}