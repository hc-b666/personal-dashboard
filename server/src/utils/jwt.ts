import dotenv from "dotenv";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

export interface ITokenPayload extends JwtPayload {
	userId: number;
	email: string;
	exp: number;
}

class TokenService {
	private static getTokenKey(): string {
		const token_key = process.env.TOKEN_KEY;
		if (!token_key) {
			throw createHttpError(500, "Internal server error");
		}

		return token_key;
	}

	private static createToken(userId: number, email: string, amount: number) {
		return jwt.sign({ userId, email }, this.getTokenKey(), {
			expiresIn: amount,
		});
	}

	static createAccessToken(userId: number, email: string) {
		return this.createToken(userId, email, 60 * 60 * 24);
	}

	static createRefreshToken(userId: number, email: string) {
		return this.createToken(userId, email, 60 * 60 * 24 * 7);
	}

	static verifyToken(token: string): ITokenPayload {
		try {
			return jwt.verify(token, this.getTokenKey()) as ITokenPayload;
		} catch (err) {
			throw createHttpError(401, "Unauthorized");
		}
	}

	static extractTokenFromHeader(authHeader: string) {
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw createHttpError(401, "Invalid authorization header");
		}

		return authHeader.split(" ")[1];
	}
}

export default TokenService;
