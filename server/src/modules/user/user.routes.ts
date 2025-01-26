import { Router } from "express";

import { authenticate } from "@/utils/auth.middleware";

import controller from "./user.controller";

const router = Router();

router.get("/", authenticate, controller.findUser);
router.put("/", authenticate, controller.updateInfo);

export default router;
