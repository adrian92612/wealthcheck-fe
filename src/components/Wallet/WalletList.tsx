import type { Wallet } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { walletApi } from "@/lib/api";
import WalletCard from "./WalletCard";
import WalletSummaryCard from "./WalletSummaryCard";

const WalletList = () => {
  const {
    data: response,
    isPending,
    error,
  } = useQuery({ queryKey: ["wallets"], queryFn: walletApi.fetchAll });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error has occured: {error.message}</div>;
  if (!response?.success) return <div>Error: {response?.message}</div>;

  const wallets: Wallet[] = response.data;

  return (
    <ul className="flex flex-wrap justify-evenly gap-5 mx-auto">
      <WalletSummaryCard wallets={wallets} />
      {!!wallets.length &&
        wallets.map((wallet) => (
          <li key={wallet.id} className="w-[300px]">
            <WalletCard wallet={wallet} />
          </li>
        ))}
    </ul>
  );
};

export default WalletList;
