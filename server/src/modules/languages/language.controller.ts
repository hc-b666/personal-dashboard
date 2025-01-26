import { RequestHandler } from "express";
import createHttpError from "http-errors";

import Controller from "../../utils/controller";

import LanguageService from "./language.service";

class LanguageController extends Controller {
	private languageService: LanguageService;

	constructor() {
		super();
		this.languageService = LanguageService.getInstance();
	}

	findAll: RequestHandler = async (req, res, next) => {
		try {
			const result = await this.languageService.findAll();
			if (!result.success) {
				throw createHttpError(500, "Something went wrong");
			}

			res.status(200).json(result.data);
		} catch (err) {
			next(err);
		}
	};
}

export default new LanguageController();
