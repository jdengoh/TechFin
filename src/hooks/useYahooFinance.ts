"use client";

import useSWR from "swr";
import { Article } from "@/types/article";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useYahooFinance() {
  const { data, error, isLoading } = useSWR<Article[]>(
    "/api/yahoo-finance",
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 300_000 }
  );

  return {
    articles: data ?? [],
    isLoading,
    error,
  };
}
