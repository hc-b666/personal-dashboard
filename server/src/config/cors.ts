import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
	credentials: true,
	origin: "*",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
