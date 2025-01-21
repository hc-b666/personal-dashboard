import { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";

function endpointNotFound(req: Request, res: Response, next: NextFunction) {
	next(createHttpError(404, "Endpoint is not found"));
}

function errorMiddleware(
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.error(`${new Date().toUTCString()}: `, err);

	let errMessage = "An unexpected error occured";
	let status = 500;
	if (isHttpError(err)) {
		status = err.status;
		errMessage = err.message;
	}

	res.status(status).json({ message: errMessage });
}

export { endpointNotFound, errorMiddleware };
