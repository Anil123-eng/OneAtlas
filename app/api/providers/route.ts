import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET() {
  try {
    const providers = await db.provider.findMany({
      include: {
        models: {
          select: {
            id: true,
            name: true,
            slug: true,
            modelType: true,
            contextWindow: true,
            inputPrice: true,
            outputPrice: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      count: providers.length,
      data: providers,
    });
  } catch (error) {
    console.error("Providers API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch providers",
      },
      { status: 500 }
    );
  }
}