import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import CurrentSummarySkeleton from "../skeleton/CurrentSummarySkeleton";
import { qCacheKey } from "@/constants/queryKeys";
import StatCard from "./StatCard";
import { Activity, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

const CurrentSummary = () => {
  const { data: response, isPending } = useQuery({
    queryKey: qCacheKey.currentSummary,
    queryFn: overviewApi.getCurrentSummary,
    throwOnError: true,
  });

  if (isPending) return <CurrentSummarySkeleton />;
  if (!response?.success) {
    return <div>Something went wrong: {response?.message}</div>;
  }

  const summary = response.data;
  const isPositive = summary.percentageDifference >= 0;
  const prefix = isPositive ? "+" : "";

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Balance"
        description="Your current wallet balance"
        icon={Wallet}
        value={formatNumber(summary.totalBalance)}
        cardCN="md:col-span-2 xl:col-span-1"
        iconCN="text-amber-600"
      />

      <StatCard
        title="Monthly Change"
        description="Compared to last month"
        icon={isPositive ? TrendingUp : TrendingDown}
        value={`${prefix}${summary.percentageDifference}%`}
        contentCN={cn(
          isPositive ? "text-primary" : "text-destructive",
          "xl:col-span-1"
        )}
        iconCN={isPositive ? "text-emerald-600" : "text-red-600"}
      />

      <StatCard
        title="Avg Daily Spend"
        description="Average spent per day this month"
        icon={Activity}
        value={formatNumber(summary.dailyAverageSpending)}
        cardCN="xl:col-span-1"
        iconCN="text-destructive"
      />
    </div>
  );
};

export default CurrentSummary;
