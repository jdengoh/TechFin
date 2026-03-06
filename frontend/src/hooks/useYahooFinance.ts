import useSWR from "swr";
import { Article } from "@/types/article";
import { authedFetcher } from "@/lib/fetcher";

// Backend returns snake_case published_at, transform to camelCase
async function articlesFetcher(url: string): Promise<Article[]> {
  const data = await authedFetcher(url);
  return (data as Record<string, unknown>[]).map((item) => ({
    id: (item.id as string) ?? "",
    title: (item.title as string) ?? "",
    summary: (item.summary as string) ?? "",
    source: (item.source as string) ?? "",
    publishedAt: (item.published_at as string) ?? (item.publishedAt as string) ?? "",
    url: (item.url as string) ?? "",
    verdict: (item.verdict as string | undefined),
    thumbnail: (item.thumbnail as string | undefined),
  }));
}

export function useYahooFinance() {
  const { data, error, isLoading } = useSWR<Article[]>(
    "/api/yahoo-finance",
    articlesFetcher,
    { revalidateOnFocus: false, dedupingInterval: 300_000 }
  );

  return {
    articles: data ?? [],
    isLoading,
    error,
  };
}
