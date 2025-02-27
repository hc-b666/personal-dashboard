"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const about_1 = require("./modules/about");
const auth_1 = require("./modules/auth");
const languages_1 = require("./modules/languages");
const projects_1 = require("./modules/projects");
const projectType_1 = require("./modules/projectType");
const user_1 = require("./modules/user");
const router = (0, express_1.Router)();
router.use("/auth", auth_1.authRoutes);
router.use("/user", user_1.userRoutes);
router.use("/about", about_1.aboutRoutes);
router.use("/projects", projects_1.projectRoutes);
router.use("/project-types", projectType_1.projectTypeRoutes);
router.use("/languages", languages_1.languageRoutes);
exports.default = router;
