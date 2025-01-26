"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserInfoSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateUserInfoSchema = zod_1.default.object({
    firstname: zod_1.default.string().max(100).optional(),
    lastname: zod_1.default.string().max(100).optional(),
});
