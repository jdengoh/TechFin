import { SocialPost } from "@/types/social";
import { authedFetcher } from "./fetcher";

export async function socialPostsFetcher(url: string): Promise<SocialPost[]> {
  const data = await authedFetcher(url);
  return (data as Record<string, unknown>[]).map((item) => ({
    id: (item.id as string) ?? "",
    platform: (item.platform as SocialPost["platform"]) ?? "reddit",
    author: (item.author as string) ?? "",
    content: (item.content as string) ?? "",
    upvotes: item.upvotes as number | undefined,
    comments: item.comments as number | undefined,
    subreddit: item.subreddit as string | undefined,
    url: (item.url as string) ?? "",
    publishedAt: (item.published_at as string) ?? (item.publishedAt as string) ?? "",
  }));
}
