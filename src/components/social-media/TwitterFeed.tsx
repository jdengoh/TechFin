"use client";

import useSWR from "swr";
import { SocialPost } from "@/types/social";
import { PostCard } from "./PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Construction } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function TwitterFeed() {
  const { data, isLoading } = useSWR<SocialPost[]>("/api/social/twitter", fetcher);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-900 dark:bg-sky-950/30">
        <Construction className="h-4 w-4 text-sky-600" />
        <p className="text-sm text-sky-700 dark:text-sky-400">
          <span className="font-medium">Coming soon:</span> Live Twitter/X integration is in development. Showing sample posts below.
        </p>
        <Badge variant="secondary" className="ml-auto bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
          Mock Data
        </Badge>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(data ?? []).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
