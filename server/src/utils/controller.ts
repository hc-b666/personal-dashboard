import { Request } from "express";
import createHttpError from "http-errors";
import { ZodSchema } from "zod";

class Controller {
	protected validateBody = <T>(req: Request, schema: ZodSchema<T>): T => {
		const result = schema.safeParse(req.body);
		if (!result.success) {
			const firstError = result.error.errors[0];
			throw createHttpError(400, firstError.message);
		}

		return result.data;
	};
}

export default Controller;
