"use client";

import useSWR from "swr";
import { SentimentData } from "@/types/sentiment";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useSentiment() {
  const { data, error, isLoading } = useSWR<SentimentData>(
    "/api/sentiment",
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    sentiment: data,
    isLoading,
    error,
  };
}
