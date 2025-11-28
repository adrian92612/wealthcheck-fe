import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { OverviewTopTransaction } from "@/lib/types";
import TopTransactionSkeleton from "../skeleton/TopTransactionSkeleton";
import TransactionCard from "../transaction/TransactionCard";
import { qCacheKey } from "@/constants/queryKeys";

const TopTransactions = () => {
  const { data: res, isPending } = useQuery({
    queryKey: qCacheKey.topTransactions,
    queryFn: overviewApi.getTopTransactions,
    throwOnError: true,
  });

  if (isPending) return <TopTransactionSkeleton />;
  if (!res?.success) {
    return <div>Something went wrong: {res?.message}</div>;
  }

  const data: OverviewTopTransaction = res.data;
  return (
    <Card className="min-h-[450px] max-h-fit">
      <CardHeader>
        <CardTitle>Top Transactions</CardTitle>
        <CardDescription>Most significant incomes and expenses</CardDescription>
      </CardHeader>

      <CardContent className="p-2">
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold mb-2 text-primary">Income</h3>
            <div className="space-y-2">
              {data.topIncome.map((tx) => (
                <TransactionCard key={tx.id} tx={tx} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-destructive">Expense</h3>
            <div className="space-y-2">
              {data.topExpense.map((tx) => (
                <TransactionCard key={tx.id} tx={tx} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopTransactions;
