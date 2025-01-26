"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../../utils/service"));
class ProjectService extends service_1.default {
    constructor() {
        super();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectService();
        }
        return this.instance;
    }
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield this.prisma.project.findMany({
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        githubLink: true,
                        createdAt: true,
                        updatedAt: true,
                        isPublic: true,
                        languages: true,
                        projectType: true,
                    },
                    where: {
                        userId,
                    },
                });
                return {
                    success: true,
                    data: projects.map((project) => (Object.assign(Object.assign({}, project), { languages: project.languages.map((lang) => ({
                            id: lang.id,
                            name: lang.name,
                            icon: lang.icon,
                        })), projectType: {
                            id: project.projectType.id,
                            name: project.projectType.name,
                        } }))),
                };
            }
            catch (err) {
                console.log("Error in ProjectService.findAll()", err);
                return {
                    success: false,
                    error: err instanceof Error ? err : new Error("Unexpected error occured!"),
                };
            }
        });
    }
    publicfindAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield this.prisma.project.findMany({
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        githubLink: true,
                        createdAt: true,
                        updatedAt: true,
                        isPublic: true,
                        languages: true,
                        projectType: true,
                    },
                    where: {
                        userId,
                        isPublic: true,
                    },
                });
                return {
                    success: true,
                    data: projects.map((project) => (Object.assign(Object.assign({}, project), { languages: project.languages.map((lang) => ({
                            id: lang.id,
                            name: lang.name,
                            icon: lang.icon,
                        })), projectType: {
                            id: project.projectType.id,
                            name: project.projectType.name,
                        } }))),
                };
            }
            catch (err) {
                console.log("Error in ProjectService.publicfindAll()", err);
                return {
                    success: false,
                    error: err instanceof Error ? err : new Error("Unexpected error occured!"),
                };
            }
        });
    }
    create(userId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.project.create({
                    data: {
                        userId,
                        title: dto.title,
                        description: dto.description ? dto.description : null,
                        githubLink: dto.githubLink,
                        isPublic: dto.isPublic,
                        projectTypeId: dto.projectTypeId,
                        languages: {
                            connect: dto.languages.map((id) => ({ id })),
                        },
                    },
                });
                return {
                    success: true,
                    data: true,
                };
            }
            catch (err) {
                console.log("Error in ProjectService.create()", err);
                return {
                    success: false,
                    error: err instanceof Error ? err : new Error("Unexpected error occured!"),
                };
            }
        });
    }
}
exports.default = ProjectService;
