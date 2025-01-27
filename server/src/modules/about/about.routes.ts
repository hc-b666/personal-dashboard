import { Router } from "express";

import { authenticate } from "../../utils/auth.middleware";

import controller from "./about.controller";

const router = Router();

router.get("/:userId([0-9]+)", controller.findByUserId);
router.put("/", authenticate, controller.update);

export default router;
