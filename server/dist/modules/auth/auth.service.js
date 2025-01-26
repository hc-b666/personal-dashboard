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
const argon2_1 = __importDefault(require("argon2"));
const service_1 = __importDefault(require("../../utils/service"));
class AuthService extends service_1.default {
    constructor() {
        super();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.prisma.user.findUnique({
                    where: { email },
                });
            }
            catch (err) {
                console.log("Error in AuthService.findUserByEmail()", err);
            }
        });
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordHash = yield argon2_1.default.hash(dto.password);
                yield this.prisma.user.create({
                    data: {
                        email: dto.email,
                        password: passwordHash,
                    },
                });
            }
            catch (err) {
                console.log("Error in AuthService.create()", err);
            }
        });
    }
}
exports.default = AuthService;
