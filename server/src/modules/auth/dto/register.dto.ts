import z from "zod";

export const registerSchema = z.object({
	email: z
		.string({ message: "Email is required" })
		.email({ message: "Invalid email address" }),
	password: z.string({ message: "Password is required" }),
});

export type RegisterDto = z.infer<typeof registerSchema>;
