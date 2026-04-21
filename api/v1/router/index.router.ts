import {Express} from "express";

import { routerTask } from "./task.router";
import { routerUser } from "./user.router"

export const mainRouterV1 = (app: Express)=>{
    const version = "/api/v1"
    app.use(version + "/tasks", routerTask);
    app.use(version + "/users", routerUser);
}