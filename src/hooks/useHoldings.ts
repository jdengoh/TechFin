"use client";

import useSWR from "swr";
import { Holding, CreateHoldingInput } from "@/types/holding";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useHoldings() {
  const { data, error, isLoading, mutate } = useSWR<Holding[]>(
    "/api/holdings",
    fetcher
  );

  const addHolding = async (input: CreateHoldingInput) => {
    const optimistic = [
      ...(data ?? []),
      {
        id: `temp-${Date.now()}`,
        ...input,
        userId: "demo-user-001",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    await mutate(
      async () => {
        const res = await fetch("/api/holdings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (!res.ok) throw new Error("Failed to add holding");
        return mutate();
      },
      { optimisticData: optimistic, rollbackOnError: true }
    );
  };

  const deleteHolding = async (id: string) => {
    const optimistic = (data ?? []).filter((h) => h.id !== id);
    await mutate(
      async () => {
        const res = await fetch(`/api/holdings/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete holding");
        return mutate();
      },
      { optimisticData: optimistic, rollbackOnError: true }
    );
  };

  return {
    holdings: data ?? [],
    isLoading,
    error,
    addHolding,
    deleteHolding,
    mutate,
  };
}
