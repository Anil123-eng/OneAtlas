import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search");
    const provider = searchParams.get("provider");
    const type = searchParams.get("type");
    const sort = searchParams.get("sort");

    const models = await db.aIModel.findMany({
      where: {
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),

        ...(provider && {
          provider: {
            slug: provider,
          },
        }),

        ...(type && {
          modelType: type,
        }),
      },

      include: {
  provider: true,
  benchmarks: {
    include: {
      benchmark: true,
    },
  },
},

      orderBy:
        sort === "price"
          ? { inputPrice: "asc" }
          : sort === "context"
            ? { contextWindow: "desc" }
            : sort === "newest"
              ? { releaseDate: "desc" }
              : { name: "asc" },
    });

    return NextResponse.json({
      success: true,
      count: models.length,
      data: models,
    });
  } catch (error) {
    console.error("Models API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch AI models",
      },
      { status: 500 }
    );
  }
}