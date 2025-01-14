import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { message: "User Id is required" },
        { status: 400 }
      );
    }

    const projects = await prisma.project.findMany({
      where: {
        userId,
        isPublic: true,
      },
      include: {
        languages: true,
        type: true,
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.log("Error in GET api/projects", err);
    return NextResponse.json(
      { message: "Something went wrong in the server" },
      { status: 500 }
    );
  }
}
