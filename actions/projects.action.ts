"use server";

import {
  type CreateProjectDto,
  createProjectSchema,
} from "@/schemas/create-project.dto";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export async function createProject(formData: CreateProjectDto) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const { success, data, error } = createProjectSchema.safeParse(formData);
    if (!success) {
      const firstError = error.errors[0];
      return { success: false, message: firstError };
    }

    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        githubLink: data.githubLink,
        isPublic: data.isPublic,
        userId,
        date: new Date(data.date),
        type: {
          connect: { id: data.type },
        },
        languages: {
          connect: data.languages.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/dashboard");

    return { success: true, message: "Project created successfully" };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma Known Error in getProjectTypes() Action:", {
        code: err.code,
        message: err.message,
        meta: err.meta,
      });
      return {
        success: false,
        message: `Database error: ${err.message}`,
      };
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error("Prisma Unknown Error in getProjectTypes() Action:", {
        message: err.message,
      });
      return {
        success: false,
        message: `Database error: ${err.message}`,
      };
    } else if (err instanceof z.ZodError) {
      console.error("Zod Validation Error:", {
        errors: err.errors,
      });
      return {
        success: false,
        error: err.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      };
    } else {
      console.error("Non-Prisma Error in getProjectTypes() Action:", {
        message: err instanceof Error ? err.message : "Unknown error",
        err,
      });
      return {
        success: false,
        message: "Something went wrong while creating the project",
      };
    }
  }
}

export async function getProjectTypes() {
  try {
    const projectTypes = await prisma.projectType.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return { success: true, projectTypes };
  } catch (err) {
    console.log(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma Known Error in getProjectTypes() Action:", {
        code: err.code,
        message: err.message,
        meta: err.meta,
      });
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error("Prisma Unknown Error in getProjectTypes() Action:", {
        message: err.message,
      });
    } else {
      console.error("Non-Prisma Error in getProjectTypes() Action:", {
        message: err instanceof Error ? err.message : "Unknown error",
        err,
      });
    }

    return { success: false };
  }
}

export async function getLanguages() {
  try {
    const languages = await prisma.language.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    return { success: true, languages };
  } catch (err) {
    console.log(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma Known Error in getLanguages() Action:", {
        code: err.code,
        message: err.message,
        meta: err.meta,
      });
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error("Prisma Unknown Error in getLanguages() Action:", {
        message: err.message,
      });
    } else {
      console.error("Non-Prisma Error in getLanguages() Action:", {
        message: err instanceof Error ? err.message : "Unknown error",
        err,
      });
    }

    return { success: false };
  }
}
