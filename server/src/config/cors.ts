import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
	credentials: true,
	origin: "https://personal-dashboard-client.vercel.app",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
