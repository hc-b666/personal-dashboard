import { Result } from "../../@types/result";
import Service from "../../utils/service";

import { UpdateUserInfoDto } from "./dto/update.dto";

interface UserInfo {
	id: number;
	firstName: string | null;
	lastName: string | null;
	logo: string | null;
	email: string;
}

class UserService extends Service {
	private static instance: UserService;

	private constructor() {
		super();
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new UserService();
		}

		return this.instance;
	}

	async findUser(userId: number) {
		try {
			const user = await this.prisma.user.findUnique({
				select: {
					firstName: true,
					lastName: true,
					logo: true,
					createdAt: true,
					updatedAt: true,
				},
				where: {
					id: userId,
				},
			});
			if (!user) {
				return {
					success: false,
					error: new Error("No user is found with this id"),
				};
			}

			return { success: true, data: user };
		} catch (err) {
			console.log("Error in UserService.findUser()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}

	async getUserInfo(userId: number): Promise<Result<UserInfo>> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: userId,
				},
			});
			if (!user) {
				return {
					success: false,
					error: new Error("No user is found with this id"),
				};
			}

			return {
				success: true,
				data: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					logo: user.logo,
					email: user.email,
				},
			};
		} catch (err) {
			console.log("Error in UserService.getUserInfo()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}

	async update(
		userId: number,
		dto: UpdateUserInfoDto,
	): Promise<Result<boolean>> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: userId,
				},
			});
			if (!user) {
				return {
					success: false,
					error: new Error("No user is found with this id"),
				};
			}

			await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					firstName: dto.firstname ? dto.firstname : null,
					lastName: dto.lastname ? dto.lastname : null,
					logo: dto.logo ? dto.logo : null,
				},
			});

			return {
				success: true,
				data: true,
			};
		} catch (err) {
			console.log("Error in UserService.update()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}
}

export default UserService;
