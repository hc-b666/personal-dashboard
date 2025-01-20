import cors from "cors";
import express from "express";
import morgan from "morgan";

import { corsConfig } from "@/config/cors";
import router from "@/router";

export const createApp = () => {
	const app = express();

	app.use(express.json());
	app.use(cors(corsConfig));
	app.use(morgan("tiny"));

	app.use("/api", router);

	return app;
};
