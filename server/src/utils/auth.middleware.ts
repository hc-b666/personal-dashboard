import { User } from "@prisma/client";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

import { AuthService } from "../modules/auth";

import TokenService, { ITokenPayload } from "./jwt";

const validateAuthHeader = (authHeader: string | undefined): ITokenPayload => {
	if (!authHeader) {
		throw createHttpError(401, "Authorization header is required");
	}

	const token = TokenService.extractTokenFromHeader(authHeader);
	const decoded = TokenService.verifyToken(token);

	return decoded;
};

const checkUser = async (decoded: ITokenPayload): Promise<User> => {
	const authService = AuthService.getInstance();
	const user = await authService.findUserByEmail(decoded.email);
	if (!user) {
		throw createHttpError(401, "Unauthorized");
	}

	return user;
};

export const authenticate: RequestHandler = async (req, res, next) => {
	try {
		const decoded = validateAuthHeader(req.headers.authorization);
		const user = await checkUser(decoded);

		req.user = {
			id: user.id,
			email: user.email,
		};

		next();
	} catch (err) {
		next(err);
	}
};
