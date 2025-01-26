declare module "express-serve-static-core" {
	interface Request {
		user: {
			id: number;
			email: string;
		};
	}
}

export {};
