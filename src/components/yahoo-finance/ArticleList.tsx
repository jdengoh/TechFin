"use client";

import { useYahooFinance } from "@/hooks/useYahooFinance";
import { ArticleCard } from "./ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

function ArticleSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-52 rounded-xl" />
      ))}
    </div>
  );
}

export function ArticleList() {
  const { articles, isLoading, error } = useYahooFinance();

  if (isLoading) return <ArticleSkeleton />;
  if (error) {
    return (
      <p className="text-sm text-muted-foreground">
        Failed to load articles. Please try again later.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
