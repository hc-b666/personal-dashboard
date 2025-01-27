import { RequestHandler } from "express";
import createHttpError from "http-errors";

import Controller from "../../utils/controller";

import AboutService from "./about.service";
import { updateAboutContentSchema } from "./dto/update.dto";

class AboutController extends Controller {
	private aboutService: AboutService;

	constructor() {
		super();
		this.aboutService = AboutService.getInstance();
	}

	findByUserId: RequestHandler = async (req, res, next) => {
		try {
			const userId = this.validateId(req, "userId");

			const result = await this.aboutService.findByUserId(userId);
			if (!result.success) {
				throw createHttpError(500, "Something went wrong while fetching");
			}

			res.status(200).json(result.data);
		} catch (err) {
			next(err);
		}
	};

	update: RequestHandler = async (req, res, next) => {
		try {
			const { id } = req.user;
			const dto = this.validateBody(req, updateAboutContentSchema);

			const result = await this.aboutService.update(id, dto);
			if (!result.success) {
				throw createHttpError(500, "Something went wrong while updating");
			}

			res.status(200).json({ success: "Successfully updated" });
		} catch (err) {
			next(err);
		}
	};
}

export default new AboutController();
