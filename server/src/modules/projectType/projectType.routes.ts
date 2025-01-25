import { Router } from "express";

import controller from "./projectType.controller";

const router = Router();

router.get("/", controller.findAll);

export default router;
