import { NextResponse } from "next/server";
import { getMockSentiment } from "@/lib/sentiment/mock-sentiment";

export async function GET() {
  try {
    const sentiment = getMockSentiment();
    return NextResponse.json(sentiment);
  } catch (error) {
    console.error("[api/sentiment GET]", error);
    return NextResponse.json({ error: "Failed to fetch sentiment" }, { status: 500 });
  }
}
