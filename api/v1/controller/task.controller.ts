import { Request, Response } from "express";
import Task from "../model/task.model";

import pagination from "../../../helper/pagination";
import searchHelper from "../../../helper/search";

export const index = async (req: Request, res: Response) => {
    //Find
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    const find: Find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    // End Find
    // Tìm kiếm
    const search = searchHelper(req.query);
    if (req.query.keyword) {
        find.title = search.regex;
    }
    // Phân trang
    const countDocument = await Task.countDocuments(find);
    const paginationPage = pagination(req.query, countDocument);
    // End Phân trang

    // Sort
    const sort: Record<string, any> = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue.toString();
    }
    // End Sort
    const task = await Task.find(find).sort(sort).skip(paginationPage.skipRecord).limit(paginationPage.limit);

    res.json(task);
}

export const detail = async (req: Request, res: Response) => {
    const task = await Task.findOne({
        deleted: false,
        _id: req.params.id
    });
    res.json(task);
}

export const changeStatus = async (req: Request, res: Response) => {
    const id: string = req.params.id.toString();
    const status: string = req.body.status;
    try {
        await Task.updateOne({
            _id: id
        }, {
            $set: {
                status: status
            }
        });
    } catch (error) {
        res.json({
            code: 100,
            message: "Cập nhật không thành công"
        });
    }
    res.json({
        code: 200,
        message: "Cập nhật thành công"
    });
}

export const changeMulti = async (req: Request, res: Response) => {
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;
    console.log(req.body);
    enum statusTask {
        status = "status",
        position = "position"
    }

    switch (key) {
        case statusTask.status:
            await Task.updateMany({
                _id: { $in: ids }
            }, {
                status: value
            });
            break;
        case statusTask.position:
            await Task.updateMany({
                _id: { $in: ids }
            }, {
                status: value
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Cập nhật thành công"
    });
}

export const create = async (req: Request, res: Response) => {
    try {
        const task = new Task(req.body);
        await task.save();
    } catch (error) {
        res.json({
            code: 100,
            message: "Thêm mới thất bại"
        });
    }
    res.json({
        code: 200,
        message: "Thêm mới thành công"
    });
}

export const edit = async (req: Request, res: Response) => {
    const id: string = req.params.id.toString();
    try {
        await Task.updateOne({
            _id: id
        }, req.body);
    } catch (error) {
        res.json({
            code: 100,
            message: "Cập nhật thất bại"
        });
    }
    res.json({
        code: 200,
        message: "Cập nhật thành công"
    });
}