import { Router } from "express";

import { authenticate } from "../../utils/auth.middleware";

import controller from "./user.controller";

const router = Router();

router.get("/", authenticate, controller.findUser);
router.get("/:userId([0-9]+)", controller.getUserInfo);
router.put("/", authenticate, controller.updateInfo);

export default router;
