import { Result } from "../../@types/result";
import Service from "../../utils/service";

import { UpdateAboutContentDto } from "./dto/update.dto";

interface FindById {
	id: number;
	content: string;
	updatedAt: Date;
}

class AboutService extends Service {
	private static instance: AboutService;

	private constructor() {
		super();
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new AboutService();
		}

		return this.instance;
	}

	async findByUserId(userId: number): Promise<Result<FindById>> {
		try {
			const aboutContent = await this.prisma.about.findFirst({
				select: {
					id: true,
					content: true,
					updatedAt: true,
				},
				where: {
					userId,
				},
			});
			if (!aboutContent) {
				return {
					success: false,
					error: new Error(`No about me section for this userId: ${userId}`),
				};
			}

			return {
				success: true,
				data: aboutContent,
			};
		} catch (err) {
			console.log("Error in AboutService.findByUserId()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}

	async update(
		userId: number,
		dto: UpdateAboutContentDto,
	): Promise<Result<boolean>> {
		try {
			const aboutContent = await this.prisma.about.findFirst({
				where: {
					userId,
				},
			});
			if (!aboutContent) {
				return {
					success: false,
					error: new Error(`No about me section for this userId: ${userId}`),
				};
			}

			await this.prisma.about.update({
				where: {
					id: aboutContent.id,
				},
				data: {
					content: dto.content,
				},
			});

			return { success: true, data: true };
		} catch (err) {
			console.log("Error in AboutService.update()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}
}

export default AboutService;
