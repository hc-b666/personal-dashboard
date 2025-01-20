import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
	credentials: true,
	origin: "http://localhost:5050",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
