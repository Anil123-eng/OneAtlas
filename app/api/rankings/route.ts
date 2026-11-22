import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET() {
  try {
    const benchmarks = await db.benchmark.findMany({
      include: {
        results: {
          include: {
            model: {
              include: {
                provider: true,
              },
            },
          },
          orderBy: {
            score: "desc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: benchmarks,
    });
  } catch (error) {
    console.error("Rankings API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch benchmark rankings",
      },
      { status: 500 }
    );
  }
}