import type { Wallet } from "@/lib/types/wallet";
import { useQuery } from "@tanstack/react-query";
import WalletFormDialog from "./WalletFormDialog";
import WalletDeleteBtn from "./WalletDeleteBtn";
import { walletApi } from "@/lib/api";

const WalletList = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["wallets"], queryFn: walletApi.fetchAll });

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
              <WalletFormDialog wallet={wallet} />
              <WalletDeleteBtn wallet={wallet} />
            </div>
          );
        })}
    </div>
  );
};

export default WalletList;
