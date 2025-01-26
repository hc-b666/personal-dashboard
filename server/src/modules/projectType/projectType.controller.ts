import { RequestHandler } from "express";
import createHttpError from "http-errors";

import Controller from "../../utils/controller";

import ProjectTypeService from "./projectType.service";

class ProjectTypeController extends Controller {
	private projectTypeService: ProjectTypeService;

	constructor() {
		super();
		this.projectTypeService = ProjectTypeService.getInstance();
	}

	findAll: RequestHandler = async (req, res, next) => {
		try {
			const result = await this.projectTypeService.findAll();
			if (!result.success) {
				throw createHttpError(500, "Something went wrong");
			}

			res.status(200).json(result.data);
		} catch (err) {
			next(err);
		}
	};
}

export default new ProjectTypeController();
