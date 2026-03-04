"use client";

import useSWR from "swr";

interface UserMeResponse {
  id: string;
  name: string;
  hasOnboarded: boolean;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useFirstLogin() {
  const { data, error, isLoading, mutate } = useSWR<UserMeResponse>(
    "/api/user/me",
    fetcher,
    { revalidateOnFocus: false }
  );

  const markOnboarded = async () => {
    await fetch("/api/user/onboarded", { method: "PATCH" });
    await mutate({ ...data!, hasOnboarded: true });
  };

  return {
    user: data,
    isLoading,
    error,
    showDialog: !isLoading && !error && data?.hasOnboarded === false,
    markOnboarded,
  };
}
