import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const CurrentSummary = () => {
  const {
    data: response,
    isPending,
    error,
  } = useQuery({
    queryKey: ["currentSummary"],
    queryFn: overviewApi.getCurrentSummary,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error has occured: {error.message}</div>;

  if (!response.success) {
    return <div>Something went wrong: {response.message}</div>;
  }

  const summary = response.data;

  return (
    <div>
      <p>Total Balance: {summary.totalBalance}</p>
      <p>Total Income: {summary.incomeThisMonth}</p>
      <p>Total Expense: {summary.expenseThisMonth}</p>
      <p>Total Net: {summary.netCashFlow}</p>
    </div>
  );
};

export default CurrentSummary;
