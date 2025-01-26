import { Router } from "express";

import { authenticate } from "@/utils/auth.middleware";

import controller from "./project.controller";

const router = Router();

router.get("/", authenticate, controller.findAll);
router.get("/:userId([0-9]+)", controller.publicfindAll);
router.post("/", authenticate, controller.create);

export default router;
