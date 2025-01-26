"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class TokenService {
    static getTokenKey() {
        const token_key = process.env.TOKEN_KEY;
        if (!token_key) {
            throw (0, http_errors_1.default)(500, "Internal server error");
        }
        return token_key;
    }
    static createToken(userId, email, amount) {
        return jsonwebtoken_1.default.sign({ userId, email }, this.getTokenKey(), {
            expiresIn: amount,
        });
    }
    static createAccessToken(userId, email) {
        return this.createToken(userId, email, 60 * 60 * 24);
    }
    static createRefreshToken(userId, email) {
        return this.createToken(userId, email, 60 * 60 * 24 * 7);
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.getTokenKey());
        }
        catch (err) {
            throw (0, http_errors_1.default)(401, "Unauthorized");
        }
    }
    static extractTokenFromHeader(authHeader) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw (0, http_errors_1.default)(401, "Invalid authorization header");
        }
        return authHeader.split(" ")[1];
    }
}
exports.default = TokenService;
