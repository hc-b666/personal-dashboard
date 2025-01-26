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
const http_errors_1 = __importDefault(require("http-errors"));
const controller_1 = __importDefault(require("../../utils/controller"));
const jwt_1 = __importDefault(require("../../utils/jwt"));
const auth_service_1 = __importDefault(require("./auth.service"));
const login_dto_1 = require("./dto/login.dto");
const refresh_dto_1 = require("./dto/refresh.dto");
const register_dto_1 = require("./dto/register.dto");
class AuthController extends controller_1.default {
    constructor() {
        super();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = this.validateBody(req, register_dto_1.registerSchema);
                const userExists = yield this.authService.findUserByEmail(data.email);
                if (userExists) {
                    throw (0, http_errors_1.default)(409, "User already exists with this email. Please login");
                }
                yield this.authService.create(data);
                res.status(201).json({ message: "Successfully registered" });
            }
            catch (err) {
                next(err);
            }
        });
        this.findUser = (dto) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.findUserByEmail(dto.email);
            if (!user) {
                throw (0, http_errors_1.default)(400, "There is no user with this email");
            }
            const isPasswordValid = yield argon2_1.default.verify(user.password, dto.password);
            if (!isPasswordValid) {
                throw (0, http_errors_1.default)(400, "Invalid password");
            }
            return user;
        });
        this.loginResponse = (user) => {
            const accessToken = jwt_1.default.createAccessToken(user.id, user.email);
            const refreshToken = jwt_1.default.createRefreshToken(user.id, user.email);
            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                },
                message: "Successfully logged in!",
            };
        };
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = this.validateBody(req, login_dto_1.loginSchema);
                const user = yield this.findUser(data);
                const response = this.loginResponse(user);
                res.status(200).json(response);
            }
            catch (err) {
                next(err);
            }
        });
        this.refresh = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = this.validateBody(req, refresh_dto_1.refreshSchema);
                const decoded = jwt_1.default.verifyToken(data.refreshToken);
                const user = yield this.authService.findUserByEmail(decoded.email);
                if (!user) {
                    throw (0, http_errors_1.default)(401, "Unauthorized");
                }
                const newAccessToken = jwt_1.default.createAccessToken(decoded.userId, decoded.email);
                res.status(201).json({ accessToken: newAccessToken });
            }
            catch (err) {
                next(err);
            }
        });
        this.authService = auth_service_1.default.getInstance();
    }
}
exports.default = new AuthController();
