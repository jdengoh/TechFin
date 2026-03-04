"use client";

import { useSentiment } from "@/hooks/useSentiment";
import { SentimentCard } from "./SentimentCard";
import { Skeleton } from "@/components/ui/skeleton";

function SentimentSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-52 rounded-xl" />
      ))}
    </div>
  );
}

export function SentimentGrid() {
  const { sentiment, isLoading, error } = useSentiment();

  if (isLoading) return <SentimentSkeleton />;
  if (error || !sentiment) {
    return (
      <p className="text-sm text-muted-foreground">Failed to load sentiment data.</p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SentimentCard title="Hot Sectors" items={sentiment.hotSectors} variant="hot" />
      <SentimentCard title="Risky Sectors" items={sentiment.riskySectors} variant="risky" />
      <SentimentCard title="Hot Regions" items={sentiment.hotRegions} variant="hot" />
      <SentimentCard title="Risky Regions" items={sentiment.riskyRegions} variant="risky" />
    </div>
  );
}
