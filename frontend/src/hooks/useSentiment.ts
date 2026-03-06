import useSWR from "swr";
import { SentimentData } from "@/types/sentiment";
import { authedFetcher } from "@/lib/fetcher";

// Backend returns snake_case keys, transform to camelCase
async function sentimentFetcher(url: string): Promise<SentimentData> {
  const data = await authedFetcher(url);
  return {
    hotSectors: data.hot_sectors ?? data.hotSectors ?? [],
    riskySectors: data.risky_sectors ?? data.riskySectors ?? [],
    hotRegions: data.hot_regions ?? data.hotRegions ?? [],
    riskyRegions: data.risky_regions ?? data.riskyRegions ?? [],
  };
}

export function useSentiment() {
  const { data, error, isLoading } = useSWR<SentimentData>(
    "/api/sentiment",
    sentimentFetcher,
    { revalidateOnFocus: false }
  );

  return {
    sentiment: data,
    isLoading,
    error,
  };
}
