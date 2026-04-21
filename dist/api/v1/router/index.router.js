"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouterV1 = void 0;
const task_router_1 = require("./task.router");
const user_router_1 = require("./user.router");
const auth_middleware_1 = require("../middleware/auth.middleware");
const mainRouterV1 = (app) => {
    const version = "/api/v1";
    app.use(version + "/tasks", auth_middleware_1.auth, task_router_1.routerTask);
    app.use(version + "/users", user_router_1.routerUser);
};
exports.mainRouterV1 = mainRouterV1;
