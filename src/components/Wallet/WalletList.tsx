import { useGetWalletList } from "@/hooks/useGetWalletList";
import { fetchWallets } from "@/services/walletApi";
import type { Wallet } from "@/types/wallet";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const WalletList = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["wallets"], queryFn: fetchWallets });

  if (isLoading) return <div>Loading wallet list...</div>;
  if (isError) return <div>Network error</div>;
  if (!response?.success) return <div>Error: {response?.message}</div>;

  const wallets: Wallet[] = response.data;

  return (
    <div>
      {!!wallets.length &&
        wallets.map((wallet) => {
          return (
            <div key={wallet.id}>
              <p>{wallet.name}</p>
              <p>{wallet.balance}</p>
              <p>{wallet.createdAt}</p>
              <p>{wallet.updatedAt}</p>
            </div>
          );
        })}
    </div>
  );
};

export default WalletList;
