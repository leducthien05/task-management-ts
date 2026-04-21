import { Request, Response } from "express";
import Task from "../model/task.model";

import pagination from "../../../helper/pagination";
import searchHelper from "../../../helper/search";

export const index = async (req: Request, res: Response)=>{    
    //Find
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    const find: Find = {
        deleted: false
    }
    if(req.query.status){
        find.status= req.query.status.toString();
    }
    // End Find
    // Tìm kiếm
    const search = searchHelper(req.query);
    if(req.query.keyword){
        find.title = search.regex;
    }
    // Phân trang
    const countDocument = await Task.countDocuments(find);
    const paginationPage = pagination(req.query, countDocument);
    // End Phân trang

    // Sort
    const sort: Record<string, any> = {};
    if(req.query.sortKey && req.query.sortValue){
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue.toString();
    }
    // End Sort
    const task = await Task.find(find).sort(sort).skip(paginationPage.skipRecord).limit(paginationPage.limit);
    
    res.json(task);
}

export const detail = async (req: Request, res: Response)=>{
    const task = await Task.findOne({
        deleted: false,
        _id: req.params.id
    });
    res.json(task);
}