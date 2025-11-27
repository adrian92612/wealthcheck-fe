import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import CurrentSummarySkeleton from "../skeleton/CurrentSummarySkeleton";
import { qCacheKey } from "@/constants/queryKeys";
import StatCard from "./StatCard";
import {
  Activity,
  Minus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
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

  const diff = summary.percentageDifference;
  const noDiff = diff === 0;
  const isPositive = diff > 0;

  const percentLabel = noDiff ? "0%" : `${diff > 0 ? "+" : ""}${diff}%`;

  const icon = noDiff ? Minus : isPositive ? TrendingUp : TrendingDown;

  const colorClass = noDiff
    ? "text-blue-muted"
    : isPositive
    ? "text-primary"
    : "text-destructive";

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Balance"
        description="Your current wallet balance"
        icon={Wallet}
        cardCN="md:col-span-2 xl:col-span-1"
        iconCN="text-amber-600"
      >
        <p className="text-xs text-text-muted mb-1">
          Last Month: {formatNumber(summary.lastMonthBalance)}
        </p>
        <p>{formatNumber(summary.totalBalance)}</p>
      </StatCard>

      <StatCard
        title="Percent Change"
        description="From previous month"
        icon={icon}
        contentCN={cn(colorClass, "xl:col-span-1")}
        iconCN={colorClass}
      >
        {percentLabel}
      </StatCard>

      <StatCard
        title="Avg Daily Spend"
        description="Average spent per day this month"
        icon={Activity}
        cardCN="xl:col-span-1"
        iconCN="text-destructive"
      >
        {formatNumber(summary.dailyAverageSpending)}
      </StatCard>
    </div>
  );
};

export default CurrentSummary;
