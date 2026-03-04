import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_USER_ID } from "@/lib/demo-user";

export async function GET() {
  try {
    const holdings = await prisma.holding.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(holdings);
  } catch (error) {
    console.error("[api/holdings GET]", error);
    return NextResponse.json({ error: "Failed to fetch holdings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticker, quantity } = body;

    if (!ticker || typeof ticker !== "string") {
      return NextResponse.json({ error: "Invalid ticker" }, { status: 400 });
    }
    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const holding = await prisma.holding.upsert({
      where: { userId_ticker: { userId: DEMO_USER_ID, ticker: ticker.toUpperCase() } },
      update: { quantity },
      create: { ticker: ticker.toUpperCase(), quantity, userId: DEMO_USER_ID },
    });

    return NextResponse.json(holding, { status: 201 });
  } catch (error) {
    console.error("[api/holdings POST]", error);
    return NextResponse.json({ error: "Failed to create holding" }, { status: 500 });
  }
}
