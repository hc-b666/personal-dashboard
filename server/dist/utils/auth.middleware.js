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
exports.authenticate = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const auth_1 = require("../modules/auth");
const jwt_1 = __importDefault(require("./jwt"));
const validateAuthHeader = (authHeader) => {
    if (!authHeader) {
        throw (0, http_errors_1.default)(401, "Authorization header is required");
    }
    const token = jwt_1.default.extractTokenFromHeader(authHeader);
    const decoded = jwt_1.default.verifyToken(token);
    return decoded;
};
const checkUser = (decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const authService = auth_1.AuthService.getInstance();
    const user = yield authService.findUserByEmail(decoded.email);
    if (!user) {
        throw (0, http_errors_1.default)(401, "Unauthorized");
    }
    return user;
});
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = validateAuthHeader(req.headers.authorization);
        const user = yield checkUser(decoded);
        req.user = {
            id: user.id,
            email: user.email,
        };
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.authenticate = authenticate;
