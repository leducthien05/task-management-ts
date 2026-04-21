import { Request, Response } from "express";
import Task from "../model/task.model";

export const index = async (req: Request, res: Response)=>{    
    //Find
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
    // End Find

    // Sort
    const sort: Record<string, any> = {};
    if(req.query.sortKey && req.query.sortValue){
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue.toString();
    }
    // End Sort
    const task = await Task.find(find).sort(sort);
    
    res.json(task);
}

export const detail = async (req: Request, res: Response)=>{
    const task = await Task.findOne({
        deleted: false,
        _id: req.params.id
    });
    res.json(task);
}