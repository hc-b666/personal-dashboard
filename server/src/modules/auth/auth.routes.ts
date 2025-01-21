import { Router } from "express";

import controller from "./auth.controller";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh", controller.refresh);

export default router;
