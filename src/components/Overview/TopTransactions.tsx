import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const TopTransactions = () => {
  const {
    data: res,
    isPending,
    error,
  } = useQuery({
    queryKey: ["topTransactions"],
    queryFn: overviewApi.getTopTransactions,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error has occured: {error.message}</div>;

  if (!res.success) {
    return <div>Something went wrong: {res.message}</div>;
  }

  const data = res.data;
  return (
    <div>
      <div>
        {data.topIncome.map((tx, i) => (
          <div key={i}>
            <p>{tx.type}</p>
            <p>{tx.name}</p>
            <p>{tx.amount}</p>
          </div>
        ))}
      </div>
      <div>
        {data.topExpense.map((tx, i) => (
          <div key={i}>
            <p>{tx.type}</p>
            <p>{tx.name}</p>
            <p>{tx.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTransactions;
