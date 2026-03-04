import { NextResponse } from "next/server";
import { fetchTwitterPosts } from "@/lib/api/twitter";

export async function GET() {
  try {
    const posts = await fetchTwitterPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[api/social/twitter GET]", error);
    return NextResponse.json({ error: "Failed to fetch Twitter posts" }, { status: 500 });
  }
}
