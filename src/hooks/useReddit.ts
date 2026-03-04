"use client";

import useSWR from "swr";
import { SocialPost } from "@/types/social";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useReddit(subreddit: string) {
  const { data, error, isLoading } = useSWR<SocialPost[]>(
    `/api/reddit?subreddit=${subreddit}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60_000 }
  );

  return {
    posts: data ?? [],
    isLoading,
    error,
  };
}
