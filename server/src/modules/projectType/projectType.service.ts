import { ProjectType } from "@prisma/client";

import { Result } from "@/@types/result";
import Service from "@/utils/service";

class ProjectTypeService extends Service {
	private static instance: ProjectTypeService;

	private constructor() {
		super();
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new ProjectTypeService();
		}

		return this.instance;
	}

	async findAll(): Promise<
		Result<Omit<ProjectType, "createdAt" | "updatedAt">[]>
	> {
		try {
			const types = await this.prisma.projectType.findMany({
				select: {
					id: true,
					name: true,
				},
			});

			return { success: true, data: types };
		} catch (err) {
			console.log("Error in ProjectTypeService.findAll()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}
}

export default ProjectTypeService;
