import useSWR from "swr";
import { Holding, CreateHoldingInput } from "@/types/holding";
import { authedFetcher } from "@/lib/fetcher";
import { getToken } from "@/lib/auth";

// Backend returns snake_case, transform to camelCase
function mapHolding(item: Record<string, unknown>): Holding {
  return {
    id: (item.id as string) ?? "",
    ticker: (item.ticker as string) ?? "",
    quantity: (item.quantity as number) ?? 0,
    userId: (item.user_id as string) ?? (item.userId as string) ?? "",
    createdAt: (item.created_at as string) ?? (item.createdAt as string) ?? "",
    updatedAt: (item.updated_at as string) ?? (item.updatedAt as string) ?? "",
  };
}

async function holdingsFetcher(url: string): Promise<Holding[]> {
  const data = await authedFetcher(url);
  return (data as Record<string, unknown>[]).map(mapHolding);
}

export function useHoldings() {
  const { data, error, isLoading, mutate } = useSWR<Holding[]>(
    "/api/holdings",
    holdingsFetcher
  );

  const addHolding = async (input: CreateHoldingInput) => {
    const optimistic = [
      ...(data ?? []),
      {
        id: `temp-${Date.now()}`,
        ...input,
        userId: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    await mutate(
      async () => {
        const res = await fetch("/api/holdings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
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
        const res = await fetch(`/api/holdings/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        });
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
