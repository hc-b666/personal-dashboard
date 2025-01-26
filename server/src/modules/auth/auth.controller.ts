import { type User } from "@prisma/client";
import argon2 from "argon2";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

import Controller from "../../utils/controller";
import TokenService from "../../utils/jwt";

import AuthService from "./auth.service";
import { type LoginDto, loginSchema } from "./dto/login.dto";
import { refreshSchema } from "./dto/refresh.dto";
import { registerSchema } from "./dto/register.dto";

class AuthController extends Controller {
	private authService: AuthService;

	constructor() {
		super();
		this.authService = AuthService.getInstance();
	}

	register: RequestHandler = async (req, res, next) => {
		try {
			const data = this.validateBody(req, registerSchema);

			const userExists = await this.authService.findUserByEmail(data.email);
			if (userExists) {
				throw createHttpError(
					409,
					"User already exists with this email. Please login",
				);
			}

			await this.authService.create(data);

			res.status(201).json({ message: "Successfully registered" });
		} catch (err) {
			next(err);
		}
	};

	private findUser = async (dto: LoginDto) => {
		const user = await this.authService.findUserByEmail(dto.email);
		if (!user) {
			throw createHttpError(400, "There is no user with this email");
		}

		const isPasswordValid = await argon2.verify(user.password, dto.password);
		if (!isPasswordValid) {
			throw createHttpError(400, "Invalid password");
		}

		return user;
	};

	private loginResponse = (user: User) => {
		const accessToken = TokenService.createAccessToken(user.id, user.email);
		const refreshToken = TokenService.createRefreshToken(user.id, user.email);

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

	login: RequestHandler = async (req, res, next) => {
		try {
			const data = this.validateBody(req, loginSchema);
			const user = await this.findUser(data);
			const response = this.loginResponse(user);

			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	};

	refresh: RequestHandler = async (req, res, next) => {
		try {
			const data = this.validateBody(req, refreshSchema);

			const decoded = TokenService.verifyToken(data.refreshToken);

			const user = await this.authService.findUserByEmail(decoded.email);
			if (!user) {
				throw createHttpError(401, "Unauthorized");
			}

			const newAccessToken = TokenService.createAccessToken(
				decoded.userId,
				decoded.email,
			);

			res.status(201).json({ accessToken: newAccessToken });
		} catch (err) {
			next(err);
		}
	};
}

export default new AuthController();
