import { NextResponse } from "next/server";
import { fetchLinkedInPosts } from "@/lib/api/linkedin";

export async function GET() {
  try {
    const posts = await fetchLinkedInPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[api/social/linkedin GET]", error);
    return NextResponse.json({ error: "Failed to fetch LinkedIn posts" }, { status: 500 });
  }
}
