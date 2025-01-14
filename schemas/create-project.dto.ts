import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  githubLink: z.string(),
  type: z.string(), 
  isPublic: z.boolean(),
  date: z.string(),
  languages: z.array(z.string()),
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
