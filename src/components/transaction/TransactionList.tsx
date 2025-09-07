import { useQuery } from "@tanstack/react-query";
import { transactionApi } from "@/lib/api";
import type { Transaction } from "@/lib/types/transaction";

const TransactionList = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionApi.fetchAll,
  });

  if (isLoading) return <div>Loading wallet list...</div>;
  if (isError) return <div>Network error</div>;
  if (!response?.success) return <div>Error: {response?.message}</div>;

  const transactions: Transaction[] = response.data;

  return (
    <div>
      {!!transactions.length &&
        transactions.map((transactions) => {
          return (
            <div key={transactions.id}>
              <p>{JSON.stringify(transactions)}</p>
            </div>
          );
        })}
    </div>
  );
};

export default TransactionList;
