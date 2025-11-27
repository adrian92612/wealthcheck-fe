import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { qCacheKey } from "@/constants/queryKeys";
import { overviewApi } from "@/lib/api";
import BudgetFormDialog from "./BudgetFormDialog";

const getProgressColor = (percent: number) =>
  percent < 50
    ? "bg-primary"
    : percent < 80
    ? "bg-blue-muted"
    : "bg-destructive";

const Budget = () => {
  const { data: response, isPending } = useQuery({
    queryKey: qCacheKey.moneyBudget,
    queryFn: overviewApi.getMoneyBudget,
    throwOnError: true,
  });

  if (isPending) return <div>Loading...</div>;
  if (!response?.success) {
    return <div>Something went wrong: {response?.message}</div>;
  }

  const data = response.data ?? {};
  const { name = "Budget", amount = 0, spentAmount = 0 } = data;

  const percentSpent = amount > 0 ? (spentAmount / amount) * 100 : 0;
  return (
    <Card className="justify-between min-h-44">
      <CardHeader className="flex justify-between gap-5">
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Track your spending</CardDescription>
        </div>
        <BudgetFormDialog moneyBudget={response.data} />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2 text-sm">
          <span>Spent</span>
          <span>
            {formatNumber(spentAmount)} / {formatNumber(amount)}
          </span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-4 rounded-full transition-all duration-300",
              getProgressColor(percentSpent)
            )}
            style={{
              width: `${Math.min(percentSpent, 100)}%`,
            }}
          />
        </div>
        <div className="text-xs mt-1 text-muted-foreground">
          {percentSpent.toFixed(0)}% spent
        </div>
      </CardContent>
    </Card>
  );
};

export default Budget;
