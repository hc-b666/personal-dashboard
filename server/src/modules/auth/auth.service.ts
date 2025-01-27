import argon2 from "argon2";

import Service from "../../utils/service";

import { RegisterDto } from "./dto/register.dto";

class AuthService extends Service {
	private static instance: AuthService;

	private constructor() {
		super();
	}

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

			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					password: passwordHash,
				},
			});

			await this.prisma.about.create({
				data: {
					userId: user.id,
					content: `My email is ${dto.email}`,
				},
			});
		} catch (err) {
			console.log("Error in AuthService.create()", err);
		}
	}
}

export default AuthService;
