"use client";

import useSWR from "swr";
import { SocialPost } from "@/types/social";
import { PostCard } from "./PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Construction } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function LinkedInFeed() {
  const { data, isLoading } = useSWR<SocialPost[]>("/api/social/linkedin", fetcher);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-900 dark:bg-blue-950/30">
        <Construction className="h-4 w-4 text-blue-600" />
        <p className="text-sm text-blue-700 dark:text-blue-400">
          <span className="font-medium">Coming soon:</span> Live LinkedIn integration is in development. Showing sample posts below.
        </p>
        <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
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
