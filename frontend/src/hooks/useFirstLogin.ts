import useSWR from "swr";
import { authedFetcher } from "@/lib/fetcher";
import { getToken } from "@/lib/auth";

interface UserMeResponse {
  id: string;
  username: string;
  has_onboarded: boolean;
}

export function useFirstLogin() {
  const { data, error, isLoading, mutate } = useSWR<UserMeResponse>(
    "/api/auth/me",
    authedFetcher,
    { revalidateOnFocus: false }
  );

  const markOnboarded = async () => {
    await fetch("/api/user/onboarded", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    await mutate({ ...data!, has_onboarded: true });
  };

  return {
    user: data,
    isLoading,
    error,
    showDialog: !isLoading && !error && data?.has_onboarded === false,
    markOnboarded,
  };
}
