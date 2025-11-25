import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Button } from "../ui/button";

const MoneyGoal = () => {
  const goalName = "Some Goal";
  const targetAmount = 1000000;
  const currentAmount = 780000;
  const percentComplete = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <Card className="justify-between min-h-44">
      <CardHeader className="flex justify-between gap-5">
        <div>
          <CardTitle>{goalName}</CardTitle>
          <CardDescription>Progress towards your goal</CardDescription>
        </div>
        <Button variant="secondary">Update</Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2 text-sm">
          <span>Saved</span>
          <span>
            {formatNumber(currentAmount)} / {formatNumber(targetAmount)}
          </span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-300 ${
              percentComplete < 50
                ? "bg-destructive"
                : percentComplete < 90
                ? "bg-blue-muted"
                : "bg-primary"
            }`}
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
