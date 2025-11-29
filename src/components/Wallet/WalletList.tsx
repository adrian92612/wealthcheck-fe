import type { Wallet } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { walletApi } from "@/lib/api";
import WalletCard from "./WalletCard";
import WalletSummaryCard from "./WalletSummaryCard";
import WalletListSkeleton from "../skeleton/WalletListSkeleton";
import { qCacheKey } from "@/constants/queryKeys";
import { useTrash } from "@/hooks/useIsTrash";

const WalletList = () => {
  const { forSoftDeleted } = useTrash();
  const { data: response, isPending } = useQuery({
    queryKey: forSoftDeleted ? qCacheKey.trashedWallets : qCacheKey.wallets,
    queryFn: forSoftDeleted ? walletApi.fetchAllTrashed : walletApi.fetchAll,
    throwOnError: true,
  });

  if (isPending) return <WalletListSkeleton />;
  if (!response?.success) return <div>Error: {response?.message}</div>;

  const wallets: Wallet[] = response.data;
  const sortedWallet = wallets.sort((a, b) => b.balance - a.balance);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {!forSoftDeleted && <WalletSummaryCard wallets={sortedWallet} />}

      {!!sortedWallet.length &&
        sortedWallet.map((wallet) => (
          <li key={wallet.id}>
            <WalletCard wallet={wallet} />
          </li>
        ))}
    </ul>
  );
};

export default WalletList;
