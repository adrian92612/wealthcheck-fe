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

const TopTransactions = () => {
  const { data: res, isPending } = useQuery({
    queryKey: ["topTransactions"],
    queryFn: overviewApi.getTopTransactions,
    throwOnError: true,
  });

  if (isPending) return <TopTransactionSkeleton />;
  if (!res?.success) {
    return <div>Something went wrong: {res?.message}</div>;
  }

  const data: OverviewTopTransaction = res.data;
  return (
    <Card className="min-h-96 xl:col-span-3">
      <CardHeader>
        <CardTitle>Top Transactions</CardTitle>
        <CardDescription>Most significant incomes and expenses</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-green-600">Income</h3>
            <div className="space-y-2">
              {data.topIncome.map((tx) => (
                <TransactionCard key={tx.id} tx={tx} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-red-600">Expense</h3>
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
