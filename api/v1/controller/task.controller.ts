import { Request, Response } from "express";
import Task from "../model/task.model";

export const index = async (req: Request, res: Response)=>{
    interface Find {
        deleted: boolean,
        status?: string
    }
    const find: Find = {
        deleted: false
    }
    if(req.query.status){
        find.status= req.query.status.toString();
    }
    const task = await Task.find(find);
    
    res.json(task);
}

export const detail = async (req: Request, res: Response)=>{
    const task = await Task.findOne({
        deleted: false,
        _id: req.params.id
    });
    res.json(task);
}