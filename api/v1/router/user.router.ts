import { Router } from "express";
const router = Router();

import { auth } from "../middleware/auth.middleware";
import * as controller from "../controller/user.controller";
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/info/:id", auth, controller.info);
// router.delete("/delete/:id", controller.deleted);
// router.delete("/delete-multi/:id", controller.deletedMulti);

export const routerUser: Router = router;