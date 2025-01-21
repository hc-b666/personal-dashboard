import { User } from "@prisma/client";
import argon2 from "argon2";

import prisma from "@/utils/prisma";

import { RegisterDto } from "./dto/register.dto";

class AuthService {
	private prisma = prisma;
	private static instance: AuthService;

	private constructor() {}

	static getInstance() {
		if (!this.instance) {
			this.instance = new AuthService();
		}

		return this.instance;
	}

	async findUserByEmail(email: string) {
		try {
			return await this.prisma.user.findUnique({
				where: { email },
			});
		} catch (err) {
			console.log("Error in AuthService.findUserByEmail()", err);
		}
	}

	async create(dto: RegisterDto) {
		try {
			const passwordHash = await argon2.hash(dto.password);

			await this.prisma.user.create({
				data: {
					email: dto.email,
					password: passwordHash,
				},
			});
		} catch (err) {
			console.log("Error in AuthService.create()", err);
		}
	}
}

export default AuthService;
