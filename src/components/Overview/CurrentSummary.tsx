import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import { Wallet, ArrowUpCircle, ArrowDownCircle, Activity } from "lucide-react";
import StatCard from "./StatCard";
import CurrentSummarySkeleton from "../skeleton/CurrentSummarySkeleton";

const CurrentSummary = () => {
  const { data: response, isPending } = useQuery({
    queryKey: ["currentSummary"],
    queryFn: overviewApi.getCurrentSummary,
    throwOnError: true,
  });

  if (isPending) return <CurrentSummarySkeleton />;
  if (!response?.success) {
    return <div>Something went wrong: {response?.message}</div>;
  }

  const summary = response.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 place-items-stretch">
      <StatCard
        title="Total Balance"
        description="You current balance"
        icon={Wallet}
        totalBalance={summary.totalBalance}
        cardCN="bg-amber-600/10"
        iconCN="text-amber-600"
      />
      <StatCard
        title="Net Cash Flow"
        description="Income - Expense"
        icon={Activity}
        totalBalance={summary.netCashFlow}
        cardCN="bg-emerald-600/10"
        iconCN="text-emerald-600"
      />

      <StatCard
        title="Total Income"
        description="This month"
        icon={ArrowUpCircle}
        totalBalance={summary.incomeThisMonth}
        cardCN="bg-green-600/10"
        iconCN="text-green-600"
      />

      <StatCard
        title="Total Expense"
        description="This month"
        icon={ArrowDownCircle}
        totalBalance={summary.expenseThisMonth}
        cardCN="bg-red-600/10"
        iconCN="text-red-600"
      />
    </div>
  );
};

export default CurrentSummary;
