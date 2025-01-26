"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProjectSchema = zod_1.default.object({
    title: zod_1.default.string().max(127),
    description: zod_1.default.string().max(255).optional(),
    githubLink: zod_1.default.string(),
    isPublic: zod_1.default.boolean(),
    projectTypeId: zod_1.default.number(),
    languages: zod_1.default.array(zod_1.default.number()),
});
