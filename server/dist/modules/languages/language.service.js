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
class LanguageService extends service_1.default {
    constructor() {
        super();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LanguageService();
        }
        return this.instance;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const types = yield this.prisma.language.findMany({
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                    },
                });
                return { success: true, data: types };
            }
            catch (err) {
                console.log("Error in LanguageService.findAll()", err);
                return {
                    success: false,
                    error: err instanceof Error ? err : new Error("Unexpected error occured!"),
                };
            }
        });
    }
}
exports.default = LanguageService;
