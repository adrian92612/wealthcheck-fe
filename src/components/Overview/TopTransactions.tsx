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

  const data: OverviewTopTransaction = res.data;
  return (
    <Card className="min-h-96 xl:col-span-3">
      <CardHeader>
        <CardTitle>Top Transactions</CardTitle>
        <CardDescription>Most significant incomes and expenses</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income */}
          <div>
            <h3 className="font-semibold mb-2 text-green-600">Top Income</h3>
            <div className="space-y-2">
              {data.topIncome.map((tx, i) => (
                <div
                  key={i}
                  className="border p-3 flex justify-between items-center shadow-sm hover:bg-forestGreen/20"
                >
                  <span className="font-medium">{tx.name}</span>
                  <span className="text-green-600 font-semibold">
                    ₱ {tx.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expense */}
          <div>
            <h3 className="font-semibold mb-2 text-red-600">Top Expense</h3>
            <div className="space-y-2">
              {data.topExpense.map((tx, i) => (
                <div
                  key={i}
                  className="border p-3 flex justify-between items-center shadow-sm hover:bg-forestGreen/20"
                >
                  <span className="font-medium">{tx.name}</span>
                  <span className="text-red-600 font-semibold">
                    ₱ {tx.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopTransactions;
