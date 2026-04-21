import { Router } from "express";
const router = Router();

import * as controller from "../controller/task.controller";
router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.patch("/change-status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.post("/create", controller.create);

export const routerTask: Router = router;