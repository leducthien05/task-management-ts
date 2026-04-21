"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedMulti = exports.deleted = exports.edit = exports.create = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../model/task.model"));
const pagination_1 = __importDefault(require("../../../helper/pagination"));
const search_1 = __importDefault(require("../../../helper/search"));
const index = async (req, res) => {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    const search = (0, search_1.default)(req.query);
    if (req.query.keyword) {
        find.title = search.regex;
    }
    const countDocument = await task_model_1.default.countDocuments(find);
    const paginationPage = (0, pagination_1.default)(req.query, countDocument);
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue.toString();
    }
    const task = await task_model_1.default.find(find).sort(sort).skip(paginationPage.skipRecord).limit(paginationPage.limit);
    res.json(task);
};
exports.index = index;
const detail = async (req, res) => {
    const task = await task_model_1.default.findOne({
        deleted: false,
        _id: req.params.id
    });
    res.json(task);
};
exports.detail = detail;
const changeStatus = async (req, res) => {
    const id = req.params.id.toString();
    const status = req.body.status;
    try {
        await task_model_1.default.updateOne({
            _id: id
        }, {
            $set: {
                status: status
            }
        });
    }
    catch (error) {
        res.json({
            code: 100,
            message: "Cập nhật không thành công"
        });
    }
    res.json({
        code: 200,
        message: "Cập nhật thành công"
    });
};
exports.changeStatus = changeStatus;
const changeMulti = async (req, res) => {
    const ids = req.body.ids;
    const key = req.body.key;
    const value = req.body.value;
    console.log(req.body);
    let statusTask;
    (function (statusTask) {
        statusTask["status"] = "status";
        statusTask["position"] = "position";
        statusTask["deleted"] = "deleted";
    })(statusTask || (statusTask = {}));
    switch (key) {
        case statusTask.status:
            await task_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                status: value
            });
            break;
        case statusTask.position:
            await task_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                status: value
            });
            break;
        case statusTask.deleted:
            await task_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                deleted: value
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Cập nhật thành công"
    });
};
exports.changeMulti = changeMulti;
const create = async (req, res) => {
    try {
        const task = new task_model_1.default(req.body);
        await task.save();
    }
    catch (error) {
        res.json({
            code: 100,
            message: "Thêm mới thất bại"
        });
    }
    res.json({
        code: 200,
        message: "Thêm mới thành công"
    });
};
exports.create = create;
const edit = async (req, res) => {
    const id = req.params.id.toString();
    try {
        await task_model_1.default.updateOne({
            _id: id
        }, req.body);
    }
    catch (error) {
        res.json({
            code: 100,
            message: "Cập nhật thất bại"
        });
    }
    res.json({
        code: 200,
        message: "Cập nhật thành công"
    });
};
exports.edit = edit;
const deleted = async (req, res) => {
    const id = req.params.id.toString();
    try {
        await task_model_1.default.updateOne({
            _id: id
        }, {
            $set: {
                deleted: true,
                deletedAt: new Date()
            }
        });
    }
    catch (error) {
        res.json({
            code: 100,
            message: "Xóa thất bại"
        });
    }
    res.json({
        code: 200,
        message: "Xóa thành công"
    });
};
exports.deleted = deleted;
const deletedMulti = async (req, res) => {
    const ids = req.body.ids;
    try {
        await task_model_1.default.updateMany({
            _id: { $in: ids }
        }, {
            $set: {
                deleted: true,
                deletedAt: new Date()
            }
        });
    }
    catch (error) {
        res.json({
            code: 100,
            message: "Xóa thất bại"
        });
    }
    res.json({
        code: 200,
        message: "Xóa thành công"
    });
};
exports.deletedMulti = deletedMulti;
