import { apiEndpoints } from "@/constants/apiEndpoints";
import { apiFetch, type ApiResponse } from "@/lib/apiClient";
import type { Wallet } from "@/types/wallet";
import { useEffect, useState } from "react";

export function useGetWalletList() {
  const [response, setResponse] = useState<ApiResponse<Wallet[]>>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await apiFetch<Wallet[]>(apiEndpoints.wallet.base);
        if (!mounted) return;
        setResponse(res);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { response, loading };
}
