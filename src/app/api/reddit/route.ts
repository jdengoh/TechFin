import { NextRequest, NextResponse } from "next/server";
import { fetchRedditPosts } from "@/lib/api/reddit";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subreddit = searchParams.get("subreddit") ?? "stocks";
    const posts = await fetchRedditPosts(subreddit);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[api/reddit GET]", error);
    return NextResponse.json({ error: "Failed to fetch Reddit posts" }, { status: 500 });
  }
}
