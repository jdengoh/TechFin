import { NextRequest, NextResponse } from "next/server";
import { searchTickers, US_TICKERS } from "@/lib/tickers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const tickers = q ? searchTickers(q) : US_TICKERS.slice(0, 20);
    return NextResponse.json(tickers);
  } catch (error) {
    console.error("[api/tickers GET]", error);
    return NextResponse.json({ error: "Failed to fetch tickers" }, { status: 500 });
  }
}
