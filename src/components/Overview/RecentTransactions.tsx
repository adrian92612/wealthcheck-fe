import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { Transaction } from "@/lib/types";
import RecentTransactionSkeleton from "../skeleton/RecentTransactionSkeleton";
import TransactionCard from "../transaction/TransactionCard";

const RecentTransactions = () => {
  const { data: res, isPending } = useQuery({
    queryKey: ["recentTransactions"],
    queryFn: overviewApi.getRecentTransactions,
    throwOnError: true,
  });

  if (isPending) return <RecentTransactionSkeleton />;

  if (!res?.success) {
    return <div>Something went wrong: {res?.message}</div>;
  }

  const transactions: Transaction[] = res.data;

  return (
    <Card className="min-h-96 xl:col-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>last 5 transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <TransactionCard key={tx.id} tx={tx} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
