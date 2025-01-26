"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../utils/auth.middleware");
const project_controller_1 = __importDefault(require("./project.controller"));
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authenticate, project_controller_1.default.findAll);
router.get("/:userId([0-9]+)", project_controller_1.default.publicfindAll);
router.post("/", auth_middleware_1.authenticate, project_controller_1.default.create);
exports.default = router;
