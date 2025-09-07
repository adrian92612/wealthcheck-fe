import { apiEndpoints } from "@/constants/apiEndpoints";
import { apiFetch } from "@/lib/apiClient";
import type { Wallet, WalletFormData } from "@/types/wallet";

export const fetchWallets = () => apiFetch<Wallet[]>(apiEndpoints.wallet.base);

export const createWallet = (data: WalletFormData) =>
  apiFetch<Wallet>(apiEndpoints.wallet.base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const updateWallet = (data: WalletFormData, id: number) =>
  apiFetch<Wallet>(apiEndpoints.wallet.byId(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const deleteWallet = (id: number) =>
  apiFetch<Wallet>(apiEndpoints.wallet.byId(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
