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
class UserService extends service_1.default {
    constructor() {
        super();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }
    findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({
                    select: {
                        firstName: true,
                        lastName: true,
                        logo: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    where: {
                        id: userId,
                    },
                });
                if (!user) {
                    return {
                        success: false,
                        error: new Error("No user is found with this id"),
                    };
                }
                return { success: true, data: user };
            }
            catch (err) {
                console.log("Error in UserService.findUser()", err);
                return {
                    success: false,
                    error: err instanceof Error ? err : new Error("Unexpected error occured!"),
                };
            }
        });
    }
    getUserInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!user) {
                    return {
                        success: false,
                        error: new Error("No user is found with this id"),
                    };
                }
                return {
                    success: true,
                    data: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        logo: user.logo,
                        email: user.email,
                    },
                };
            }
            catch (err) {
                console.log("Error in UserService.getUserInfo()", err);
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
                const user = yield this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!user) {
                    return {
                        success: false,
                        error: new Error("No user is found with this id"),
                    };
                }
                yield this.prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        firstName: dto.firstname ? dto.firstname : null,
                        lastName: dto.lastname ? dto.lastname : null,
                        logo: dto.logo ? dto.logo : null,
                    },
                });
                return {
                    success: true,
                    data: true,
                };
            }
            catch (err) {
                console.log("Error in UserService.update()", err);
                return {
                    success: false,
                    error: err instanceof Error ? err : new Error("Unexpected error occured!"),
                };
            }
        });
    }
}
exports.default = UserService;
