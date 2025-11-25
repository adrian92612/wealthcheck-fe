import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Button } from "../ui/button";

const Budget = () => {
  const totalBudget = 1000;
  const spent = 2000;
  const percentSpent = (spent / totalBudget) * 100;
  return (
    <Card className="justify-between min-h-44">
      <CardHeader className="flex justify-between gap-5">
        <div>
          <CardTitle>Monthly Budget</CardTitle>
          <CardDescription>Track your spending</CardDescription>
        </div>
        <Button variant="secondary">Update</Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2 text-sm">
          <span>Spent</span>
          <span>
            {formatNumber(spent)} / {formatNumber(totalBudget)}
          </span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-300 ${
              percentSpent < 50
                ? "bg-primary"
                : percentSpent < 90
                ? "bg-secondary"
                : "bg-destructive"
            }`}
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
