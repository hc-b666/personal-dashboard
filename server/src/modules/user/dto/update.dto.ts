import z from "zod";

export const updateUserInfoSchema = z.object({
	firstname: z.string().max(100).optional(),
	lastname: z.string().max(100).optional(),
	logo: z.string().max(32).optional(),
});

export type UpdateUserInfoDto = z.infer<typeof updateUserInfoSchema>;
