import { Language } from "@prisma/client";

import { Result } from "../../@types/result";
import Service from "../../utils/service";

class LanguageService extends Service {
	private static instance: LanguageService;

	private constructor() {
		super();
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new LanguageService();
		}

		return this.instance;
	}

	async findAll(): Promise<
		Result<Omit<Language, "createdAt" | "updatedAt">[]>
	> {
		try {
			const types = await this.prisma.language.findMany({
				select: {
					id: true,
					name: true,
					icon: true,
				},
			});

			return { success: true, data: types };
		} catch (err) {
			console.log("Error in LanguageService.findAll()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}
}

export default LanguageService;
