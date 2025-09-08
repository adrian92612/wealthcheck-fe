import { useQuery } from "@tanstack/react-query";
import { categoryApi, transactionApi, walletApi } from "@/lib/api";
import TransactionFormDialog from "./TransactionFormDialog";
import { capitalizeFirstLetter } from "@/lib/utils";

const TransactionList = () => {
  const {
    data: txResp,
    isPending: txPending,
    error: txError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionApi.fetchAll,
  });

  const {
    data: walletResp,
    isPending: wPending,
    error: wError,
  } = useQuery({
    queryKey: ["wallets"],
    queryFn: walletApi.fetchAll,
  });

  const {
    data: catResp,
    isPending: cPending,
    error: cError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.fetchAll,
  });

  if (txPending || wPending || cPending) return <div>Loading...</div>;
  if (txError || wError || cError) {
    return <div>An error has occured, try again later.</div>;
  }

  if (!txResp?.success) return <div>Error: {txResp?.message}</div>;
  if (!walletResp?.success) return <div>Error: {walletResp?.message}</div>;
  if (!catResp?.success) return <div>Error: {catResp?.message}</div>;

  const transactions = txResp.data;
  const wallets = walletResp.data;
  const categories = catResp.data;

  return (
    <div>
      {!!transactions.length &&
        transactions.map((transaction) => {
          return (
            <div key={transaction.id}>
              <p>{capitalizeFirstLetter(transaction.type)}</p>
              <p>{transaction.title}</p>
              <p>{transaction.notes}</p>
              <p>{transaction.amount}</p>
              <TransactionFormDialog
                transaction={transaction}
                wallets={wallets}
                categories={categories}
              />
            </div>
          );
        })}
      <TransactionFormDialog wallets={wallets} categories={categories} />
    </div>
  );
};

export default TransactionList;
