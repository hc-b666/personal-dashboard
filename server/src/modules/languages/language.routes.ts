import { Router } from "express";

import controller from "./language.controller";

const router = Router();

router.get("/", controller.findAll);

export default router;
