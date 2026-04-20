import { Router } from "express";
const router = Router();

import * as controller from "../controller/task.controller";
router.get("/", controller.index);
router.get("/detail/:id", controller.detail);

export const routerTask: Router = router;