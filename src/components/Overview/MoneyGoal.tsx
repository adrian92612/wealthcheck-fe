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
import MoneyGoalFormDialog from "./MoneyGoalFormDialog";

const getProgressColor = (percent: number) =>
  percent < 50
    ? "bg-destructive"
    : percent < 80
    ? "bg-blue-muted"
    : "bg-primary";

const MoneyGoal = () => {
  const { data: response, isPending } = useQuery({
    queryKey: qCacheKey.moneyGoal,
    queryFn: overviewApi.getMoneyGoal,
    throwOnError: true,
  });

  if (isPending) return <div>Loading...</div>;
  if (!response?.success) {
    return <div>Something went wrong: {response?.message}</div>;
  }

  const data = response.data ?? {};
  const { name = "Goal", amount = 0, currentBalance = 0 } = data;

  const percentComplete =
    amount > 0 ? Math.min((currentBalance / amount) * 100, 100) : 0;

  return (
    <Card className="justify-between min-h-44">
      <CardHeader className="flex justify-between gap-5">
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Progress towards your goal</CardDescription>
        </div>
        <MoneyGoalFormDialog moneyGoal={response.data} />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2 text-sm">
          <span>Saved</span>
          <span>
            {formatNumber(currentBalance)} / {formatNumber(amount)}
          </span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-4 rounded-full transition-all duration-300",
              getProgressColor(percentComplete)
            )}
            style={{ width: `${percentComplete}%` }}
          />
        </div>
        <div className="text-xs mt-1 text-muted-foreground">
          {percentComplete.toFixed(0)}% complete
        </div>
      </CardContent>
    </Card>
  );
};

export default MoneyGoal;
