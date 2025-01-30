"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../utils/auth.middleware");
const user_controller_1 = __importDefault(require("./user.controller"));
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authenticate, user_controller_1.default.findUser);
router.get("/:userId([0-9]+)", user_controller_1.default.getUserInfo);
router.put("/", auth_middleware_1.authenticate, user_controller_1.default.updateInfo);
exports.default = router;
