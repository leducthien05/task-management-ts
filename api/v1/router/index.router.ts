import {Express} from "express";

import { routerTask } from "./task.router";

export const mainRouterV1 = (app: Express)=>{
    const version = "/api/v1"
    app.use(version + "/tasks", routerTask);
}