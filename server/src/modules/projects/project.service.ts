import { Result } from "../../@types/result";
import Service from "../../utils/service";

import { CreateProjectDto } from "./dto/createProject.dto";

type FindAllData = {
	id: number;
	title: string;
	description: string | null;
	githubLink: string;
	createdAt: Date;
	updatedAt: Date;
	isPublic: boolean;
	languages: {
		id: number;
		name: string;
		icon: string;
	}[];
	projectType: {
		id: number;
		name: string;
	};
}[];

class ProjectService extends Service {
	private static instance: ProjectService;

	private constructor() {
		super();
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new ProjectService();
		}

		return this.instance;
	}

	async findAll(userId: number): Promise<Result<FindAllData>> {
		try {
			const projects = await this.prisma.project.findMany({
				select: {
					id: true,
					title: true,
					description: true,
					githubLink: true,
					createdAt: true,
					updatedAt: true,
					isPublic: true,
					languages: true,
					projectType: true,
				},
				where: {
					userId,
				},
			});

			return {
				success: true,
				data: projects.map((project) => ({
					...project,
					languages: project.languages.map((lang) => ({
						id: lang.id,
						name: lang.name,
						icon: lang.icon,
					})),
					projectType: {
						id: project.projectType.id,
						name: project.projectType.name,
					},
				})),
			};
		} catch (err) {
			console.log("Error in ProjectService.findAll()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}

	async publicfindAll(userId: number): Promise<Result<FindAllData>> {
		try {
			const projects = await this.prisma.project.findMany({
				select: {
					id: true,
					title: true,
					description: true,
					githubLink: true,
					createdAt: true,
					updatedAt: true,
					isPublic: true,
					languages: true,
					projectType: true,
				},
				where: {
					userId,
					isPublic: true,
				},
			});

			return {
				success: true,
				data: projects.map((project) => ({
					...project,
					languages: project.languages.map((lang) => ({
						id: lang.id,
						name: lang.name,
						icon: lang.icon,
					})),
					projectType: {
						id: project.projectType.id,
						name: project.projectType.name,
					},
				})),
			};
		} catch (err) {
			console.log("Error in ProjectService.publicfindAll()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}

	async create(
		userId: number,
		dto: CreateProjectDto,
	): Promise<Result<boolean>> {
		try {
			await this.prisma.project.create({
				data: {
					userId,
					title: dto.title,
					description: dto.description ? dto.description : null,
					githubLink: dto.githubLink,
					isPublic: dto.isPublic,
					projectTypeId: dto.projectTypeId,
					languages: {
						connect: dto.languages.map((id) => ({ id })),
					},
				},
			});

			return {
				success: true,
				data: true,
			};
		} catch (err) {
			console.log("Error in ProjectService.create()", err);
			return {
				success: false,
				error:
					err instanceof Error ? err : new Error("Unexpected error occured!"),
			};
		}
	}
}

export default ProjectService;
