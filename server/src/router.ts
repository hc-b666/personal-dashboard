import { Router } from "express";

import { authRoutes } from "@/modules/auth";

const router = Router();

router.use("/auth", authRoutes);

export default router;
