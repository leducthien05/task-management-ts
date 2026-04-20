import { Request, Response } from "express";
import Task from "../model/task.model";

export const index = async (req: Request, res: Response)=>{
    const task = await Task.find({
        deleted: false
    });
    console.log(task);
    res.json(task);
}

export const detail = async (req: Request, res: Response)=>{
    const task = await Task.findOne({
        deleted: false,
        _id: req.params.id
    });
    res.json(task);
}