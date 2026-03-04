import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_USER_ID } from "@/lib/demo-user";
import { TickerSuggestion } from "@/types/ticker";

export async function GET() {
  try {
    const holdings = await prisma.holding.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { createdAt: "desc" },
    });

    // Stub logic: suggest what the user already owns
    const suggestions: TickerSuggestion[] = holdings.map((h) => ({
      ticker: h.ticker,
      quantity: h.quantity,
      reason: "Based on your current portfolio holdings",
    }));

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("[api/suggestions GET]", error);
    return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}
