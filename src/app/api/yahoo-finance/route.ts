import { NextResponse } from "next/server";
import { fetchYahooFinanceNews } from "@/lib/api/yahoo-finance";

export async function GET() {
  try {
    const articles = await fetchYahooFinanceNews();
    return NextResponse.json(articles);
  } catch (error) {
    console.error("[api/yahoo-finance GET]", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
