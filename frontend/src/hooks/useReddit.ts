import useSWR from "swr";
import { SocialPost } from "@/types/social";
import { socialPostsFetcher } from "@/lib/social-fetcher";

export function useReddit(subreddit: string) {
  const { data, error, isLoading } = useSWR<SocialPost[]>(
    `/api/reddit?subreddit=${subreddit}`,
    socialPostsFetcher,
    { revalidateOnFocus: false, dedupingInterval: 60_000 }
  );

  return {
    posts: data ?? [],
    isLoading,
    error,
  };
}
