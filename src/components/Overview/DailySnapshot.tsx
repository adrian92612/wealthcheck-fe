import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { qCacheKey } from "@/constants/queryKeys";
import { overviewApi } from "@/lib/api";
import CurrentSummarySkeleton from "../skeleton/CurrentSummarySkeleton";

const chartConfig = {
  net: {
    label: "Daily Net",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function DailySnapshot() {
  const { data: response, isPending } = useQuery({
    queryKey: qCacheKey.dailySnapshot,
    queryFn: overviewApi.getDailySnapshot,
    throwOnError: true,
  });

  if (isPending) return <CurrentSummarySkeleton />;
  if (!response?.success) {
    return <div>Something went wrong: {response?.message}</div>;
  }

  const chartData = response.data;

  return (
    <Card className="overflow-x-auto">
      <CardHeader>
        <CardTitle>Daily Net Flow</CardTitle>
        <CardDescription>
          Visualizes your daily net income/expenses for the current month.
          Positive bars are income, negative bars are expenses.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-3xl">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12, top: 16, bottom: 16 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(date) => date.slice(8)}
              tickMargin={8}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={40}
              tickFormatter={(v) => v.toLocaleString()}
            />

            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const { date, net } = payload[0].payload;
                return (
                  <div className="bg-white border p-2 rounded shadow-sm text-sm">
                    <div>
                      <strong>Date:</strong> {date}
                    </div>
                    <div>
                      <strong>Net:</strong> {net.toLocaleString()}
                    </div>
                  </div>
                );
              }}
            />

            <Bar dataKey="net">
              {chartData.map((item) => (
                <Cell
                  key={item.date}
                  fill={item.net >= 0 ? "var(--chart-2)" : "var(--destructive)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm w-full text-muted-foreground flex gap-1 justify-between">
          <div>
            <div>
              <strong>Total Income:</strong>{" "}
              {chartData
                .filter((d) => d.net > 0)
                .reduce((sum, d) => sum + d.net, 0)
                .toLocaleString()}
            </div>
            <div>
              <strong>Total Expenses:</strong>{" "}
              {chartData
                .filter((d) => d.net < 0)
                .reduce((sum, d) => sum + Math.abs(d.net), 0)
                .toLocaleString()}
            </div>
            <div>
              <strong>Net Cash Flow:</strong>{" "}
              {chartData.reduce((sum, d) => sum + d.net, 0).toLocaleString()}
            </div>
          </div>

          {/* <div>
            <div>
              <strong>Highest Income Day:</strong>{" "}
              {chartData
                .filter((d) => d.net > 0)
                .reduce((prev, curr) => (curr.net > prev.net ? curr : prev), {
                  date: "",
                  net: 0,
                }).date || "-"}
            </div>
            <div>
              <strong>Largest Expense Day:</strong>{" "}
              {chartData
                .filter((d) => d.net < 0)
                .reduce((prev, curr) => (curr.net < prev.net ? curr : prev), {
                  date: "",
                  net: 0,
                }).date || "-"}
            </div>
          </div> */}
        </div>
      </CardFooter>
    </Card>
  );
}

export default DailySnapshot;
