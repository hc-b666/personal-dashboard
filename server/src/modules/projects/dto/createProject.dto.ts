import z from "zod";

export const createProjectSchema = z.object({
  title: z.string().max(127),
  description: z.string().max(255).optional(),
  githubLink: z.string(),
  isPublic: z.boolean(),
  projectTypeId: z.number(),
  languages: z.array(z.number()),
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
