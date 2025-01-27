"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutContentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateAboutContentSchema = zod_1.default.object({
    content: zod_1.default.string().max(2024),
});
