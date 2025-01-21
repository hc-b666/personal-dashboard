import z from "zod";

export const registerSchema = z.object({
	email: z.string(),
	password: z.string().min(6).max(16),
});

export type RegisterDto = z.infer<typeof registerSchema>;
