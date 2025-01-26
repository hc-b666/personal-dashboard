"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const language_controller_1 = __importDefault(require("./language.controller"));
const router = (0, express_1.Router)();
router.get("/", language_controller_1.default.findAll);
exports.default = router;
