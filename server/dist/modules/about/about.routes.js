"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../utils/auth.middleware");
const about_controller_1 = __importDefault(require("./about.controller"));
const router = (0, express_1.Router)();
router.get("/:userId([0-9]+)", about_controller_1.default.findByUserId);
router.put("/", auth_middleware_1.authenticate, about_controller_1.default.update);
exports.default = router;
