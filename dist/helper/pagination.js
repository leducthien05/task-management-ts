"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination = (query, count) => {
    const objectPage = {
        currentPage: 1,
        limit: 2,
        skipRecord: 0,
        totalPage: 1
    };
    if (query.page) {
        objectPage.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objectPage.limit = parseInt(query.limit);
    }
    objectPage.skipRecord = (objectPage.currentPage - 1) * objectPage.limit;
    objectPage.totalPage = Math.ceil(count / objectPage.limit);
    return objectPage;
};
exports.default = pagination;
