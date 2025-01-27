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
class AboutService extends service_1.default {
    constructor() {
        super();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AboutService();
        }
        return this.instance;
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aboutContent = yield this.prisma.about.findFirst({
                    select: {
                        id: true,
                        content: true,
                        updatedAt: true,
                    },
                    where: {
                        userId,
                    },
                });
                if (!aboutContent) {
                    return {
                        success: false,
                        error: new Error(`No about me section for this userId: ${userId}`),
                    };
                }
                return {
                    success: true,
                    data: aboutContent,
                };
            }
            catch (err) {
                console.log("Error in AboutService.findByUserId()", err);
                return {
                    success: false,
                    error: err instanceof Error ? err : new Error("Unexpected error occured!"),
                };
            }
        });
    }
    update(userId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aboutContent = yield this.prisma.about.findFirst({
                    where: {
                        userId,
                    },
                });
                if (!aboutContent) {
                    return {
                        success: false,
                        error: new Error(`No about me section for this userId: ${userId}`),
                    };
                }
                yield this.prisma.about.update({
                    where: {
                        id: aboutContent.id,
                    },
                    data: {
                        content: dto.content,
                    },
                });
                return { success: true, data: true };
            }
            catch (err) {
                console.log("Error in AboutService.update()", err);
                return {
                    success: false,
                    error: err instanceof Error ? err : new Error("Unexpected error occured!"),
                };
            }
        });
    }
}
exports.default = AboutService;
