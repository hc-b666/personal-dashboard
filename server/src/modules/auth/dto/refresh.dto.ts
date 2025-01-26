import z from "zod";

export const refreshSchema = z.object({
	refreshToken: z.string(),
});

export type RefreshDto = z.infer<typeof refreshSchema>;
