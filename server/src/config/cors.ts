import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
	credentials: true,
	origin: "http://localhost:5173",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
