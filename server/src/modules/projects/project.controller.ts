import { RequestHandler } from "express";
import createHttpError from "http-errors";

import Controller from "@/utils/controller";

import { createProjectSchema } from "./dto/createProject.dto";
import ProjectService from "./project.service";

class ProjectController extends Controller {
	private projectService: ProjectService;

	constructor() {
		super();
		this.projectService = ProjectService.getInstance();
	}

	findAll: RequestHandler = async (req, res, next) => {
		try {
			const user = req.user;

			const result = await this.projectService.findAll(user.id);
			if (!result.success) {
				throw createHttpError(
					500,
					"Something went wrong while fetching all projects",
				);
			}

			res.status(200).json(result.data);
		} catch (err) {
			next(err);
		}
	};

	publicfindAll: RequestHandler = async (req, res, next) => {
		try {
			const id = this.validateId(req, "userId");

			const result = await this.projectService.findAll(id);
			if (!result.success) {
				throw createHttpError(
					500,
					"Something went wrong while fetching all projects",
				);
			}

			res.status(200).json(result.data);
		} catch (err) {
			next(err);
		}
	};

	create: RequestHandler = async (req, res, next) => {
		try {
			const user = req.user;
			const dto = this.validateBody(req, createProjectSchema);

			const result = await this.projectService.create(user.id, dto);
			if (!result.success) {
				throw createHttpError(500, "Something went wrong while updating");
			}

			res.status(201).json({ message: "Successfully created" });
		} catch (err) {
			next(err);
		}
	};
}

export default new ProjectController();
