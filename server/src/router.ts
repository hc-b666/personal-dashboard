import { Router } from "express";

import { aboutRoutes } from "./modules/about";
import { authRoutes } from "./modules/auth";
import { languageRoutes } from "./modules/languages";
import { projectRoutes } from "./modules/projects";
import { projectTypeRoutes } from "./modules/projectType";
import { userRoutes } from "./modules/user";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/about", aboutRoutes);
router.use("/projects", projectRoutes);
router.use("/project-types", projectTypeRoutes);
router.use("/languages", languageRoutes);

export default router;
