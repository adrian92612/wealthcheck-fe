import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { TopTransaction } from "@/lib/types";
import { Circle } from "lucide-react";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import RecentTransactionSkeleton from "../skeleton/RecentTransactionSkeleton";

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

  const transactions: TopTransaction[] = res.data;
  return (
    <Card className="min-h-96 xl:col-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>last 5 transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx, i) => {
            const fontColor =
              tx.type === "EXPENSE"
                ? "text-red-600"
                : tx.type === "INCOME"
                ? "text-green-600"
                : "text-blue-600";
            return (
              <div
                key={i}
                className="flex justify-between gap-2 flex-wrap items-start border p-3 shadow-sm hover:bg-forestGreen/20"
              >
                <div className="flex items-center gap-3">
                  <Circle className={cn("size-5 shrink-0", fontColor)} />
                  <div className="flex flex-col">
                    <span className="font-medium">{tx.categoryName}</span>
                    <span className="text-xs text-muted-foreground">
                      {capitalizeFirstLetter(tx.type)}
                    </span>
                  </div>
                </div>

                <span className={cn("font-semibold", fontColor)}>
                  ₱{tx.amount}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
