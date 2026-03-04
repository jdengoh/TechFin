"use client";

import { useState } from "react";
import { useReddit } from "@/hooks/useReddit";
import { PostCard } from "./PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUBREDDITS = ["wallstreetbets", "stocks", "economics"] as const;

export function RedditFeed() {
  const [subreddit, setSubreddit] = useState<string>("wallstreetbets");
  const { posts, isLoading, error } = useReddit(subreddit);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {SUBREDDITS.map((sub) => (
          <Button
            key={sub}
            size="sm"
            variant={subreddit === sub ? "default" : "outline"}
            onClick={() => setSubreddit(sub)}
            className={cn(subreddit === sub && "bg-orange-500 hover:bg-orange-600 text-white border-orange-500")}
          >
            r/{sub}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-muted-foreground">
          Failed to load Reddit posts.
        </p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
