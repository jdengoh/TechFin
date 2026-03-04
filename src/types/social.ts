export type SocialPlatform = "reddit" | "twitter" | "linkedin";

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  author: string;
  content: string;
  upvotes?: number;
  comments?: number;
  subreddit?: string;
  url: string;
  publishedAt: string;
}
