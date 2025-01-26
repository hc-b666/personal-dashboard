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
const http_errors_1 = __importDefault(require("http-errors"));
const controller_1 = __importDefault(require("../../utils/controller"));
const update_dto_1 = require("./dto/update.dto");
const user_service_1 = __importDefault(require("./user.service"));
class UserController extends controller_1.default {
    constructor() {
        super();
        this.findUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const result = yield this.userService.findUser(userId);
                if (!result.success) {
                    throw (0, http_errors_1.default)(500, "Something went wrong");
                }
                res.status(200).json(result.data);
            }
            catch (err) {
                next(err);
            }
        });
        this.updateInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const dto = this.validateBody(req, update_dto_1.updateUserInfoSchema);
                const result = yield this.userService.update(userId, dto);
                if (!result.success) {
                    throw (0, http_errors_1.default)(500, "Something went wrong while updating");
                }
                res.status(200).json({ message: "Updated successfully" });
            }
            catch (err) {
                next(err);
            }
        });
        this.userService = user_service_1.default.getInstance();
    }
}
exports.default = new UserController();
