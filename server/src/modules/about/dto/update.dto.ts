import z from "zod";

export const updateAboutContentSchema = z.object({
	content: z.string().max(2024),
});

export type UpdateAboutContentDto = z.infer<typeof updateAboutContentSchema>;
