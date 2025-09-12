import type { Wallet } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { walletApi } from "@/lib/api";
import WalletCard from "./WalletCard";
import WalletSummaryCard from "./WalletSummaryCard";
import WalletListSkeleton from "../skeleton/WalletListSkeleton";

const WalletList = () => {
  const { data: response, isPending } = useQuery({
    queryKey: ["wallets"],
    queryFn: walletApi.fetchAll,
    throwOnError: true,
  });

  if (isPending) return <WalletListSkeleton />;
  if (!response?.success) return <div>Error: {response?.message}</div>;

  const wallets: Wallet[] = response.data;

  return (
    <ul className="flex flex-wrap justify-center sm:justify-start gap-5">
      <WalletSummaryCard wallets={wallets} />
      {!!wallets.length &&
        wallets.map((wallet) => (
          <li key={wallet.id} className="flex-[1_0_300px] max-w-[300px]">
            <WalletCard wallet={wallet} />
          </li>
        ))}
    </ul>
  );
};

export default WalletList;
