import { RequestHandler } from "express";
import createHttpError from "http-errors";

import Controller from "@/utils/controller";

import { updateUserInfoSchema } from "./dto/update.dto";
import UserService from "./user.service";

class UserController extends Controller {
	private userService: UserService;

	constructor() {
		super();
		this.userService = UserService.getInstance();
	}

	findUser: RequestHandler = async (req, res, next) => {
		try {
			const userId = req.user.id;

			const result = await this.userService.findUser(userId);
			if (!result.success) {
				throw createHttpError(500, "Something went wrong");
			}

			res.status(200).json(result.data);
		} catch (err) {
			next(err);
		}
	};

	updateInfo: RequestHandler = async (req, res, next) => {
		try {
			const userId = req.user.id;
			const dto = this.validateBody(req, updateUserInfoSchema);

			const result = await this.userService.update(userId, dto);
			if (!result.success) {
				throw createHttpError(500, "Something went wrong while updating");
			}

			res.status(200).json({ message: "Updated successfully" });
		} catch (err) {
			next(err);
		}
	};
}

export default new UserController();
