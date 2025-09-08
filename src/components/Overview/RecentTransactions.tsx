import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const RecentTransactions = () => {
  const {
    data: res,
    isPending,
    error,
  } = useQuery({
    queryKey: ["recentTransactions"],
    queryFn: overviewApi.getRecentTransactions,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error has occured: {error.message}</div>;

  if (!res.success) {
    return <div>Something went wrong: {res.message}</div>;
  }

  const transactions = res.data;
  return (
    <div>
      {transactions.map((tx, i) => (
        <div key={i}>
          <p>{tx.type}</p>
          <p>{tx.name}</p>
          <p>{tx.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;
