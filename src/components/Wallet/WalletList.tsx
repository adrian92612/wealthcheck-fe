import type { Wallet } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import WalletFormDialog from "./WalletFormDialog";
import WalletDeleteBtn from "./WalletDeleteBtn";
import { walletApi } from "@/lib/api";

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
