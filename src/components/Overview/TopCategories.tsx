import { qCacheKey } from "@/constants/queryKeys";
import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatNumber } from "@/lib/utils";
import { format } from "date-fns";

const expenseColors = [
  "oklch(0.38 0.18 22)",
  "oklch(0.48 0.18 22)",
  "oklch(0.68 0.18 22)",
  "oklch(0.78 0.18 22)",
];

const incomeColors = [
  "oklch(0.4086 0.0787 162.45)",
  "oklch(0.5086 0.0787 162.45)",
  "oklch(0.6086 0.0787 162.45)",
  "oklch(0.7086 0.0787 162.45)",
];

const CustomBarLabel = ({
  y,
  value,
  name,
}: {
  x: number;
  y: number;
  value: number;
  name: string;
  index: number;
}) => {
  return (
    <>
      <text
        x={5}
        y={y - 6}
        textAnchor="start"
        className="fill-text font-medium text-xs"
        fontSize={12}
      >
        {name}
      </text>

      <text
        x="100%"
        y={y - 6}
        textAnchor="end"
        className="fill-text text-xs"
        fontSize={12}
      >
        {formatNumber(value)}
      </text>
    </>
  );
};

const TopCategories = () => {
  const { data: response, isPending } = useQuery({
    queryKey: qCacheKey.topCategories,
    queryFn: overviewApi.getTopCategories,
    throwOnError: true,
  });

  if (isPending) return <div>Loading...</div>;
  if (!response?.success) {
    return <div>Something went wrong: {response?.message}</div>;
  }

  const chartData = response.data;

  const incomeChartData = chartData.topIncomeCategories.map((item, index) => ({
    ...item,
    fill: incomeColors[index % incomeColors.length], // assign slice colors
  }));

  const incomeChartConfig: ChartConfig = incomeChartData.reduce(
    (acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: incomeColors[index % incomeColors.length],
      };
      return acc;
    },
    {} as ChartConfig
  );

  const expenseChartData = chartData.topExpenseCategories.map(
    (item, index) => ({
      ...item,
      fill: expenseColors[index % expenseColors.length], // assign slice colors
    })
  );

  const expenseChartConfig: ChartConfig = expenseChartData.reduce(
    (acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: expenseColors[index % expenseColors.length],
      };
      return acc;
    },
    {} as ChartConfig
  );

  const thisMonth = format(new Date(), "MMMM");
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="overflow-x-auto justify-between min-h-60">
        <CardHeader>
          <CardTitle>Top Income Categories</CardTitle>
          <CardDescription>
            Shows your highest income sources for {thisMonth}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={incomeChartConfig}
            className="h-34 w-full p-2"
          >
            <BarChart
              accessibilityLayer
              data={incomeChartData}
              layout="vertical"
              margin={{
                right: 100,
                top: 12,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey="amount" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="amount"
                layout="vertical"
                barSize={8}
                radius={4}
                isAnimationActive={false}
                label={(props) => (
                  <CustomBarLabel
                    x={props.x}
                    y={props.y}
                    value={props.value}
                    name={incomeChartData[props.index]?.name || ""}
                    index={props.index}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="overflow-x-auto justify-between min-h-60">
        <CardHeader>
          <CardTitle>Top Spending Categories</CardTitle>
          <CardDescription>
            Shows your largest expenses for {thisMonth}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={expenseChartConfig}
            className="h-34 w-full p-2"
          >
            <BarChart
              accessibilityLayer
              data={expenseChartData}
              layout="vertical"
              margin={{
                right: 100,
                top: 12,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey="amount" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="amount"
                layout="vertical"
                barSize={8}
                radius={4}
                isAnimationActive={false}
                label={(props) => (
                  <CustomBarLabel
                    x={props.x}
                    y={props.y}
                    value={props.value}
                    name={expenseChartData[props.index]?.name || ""}
                    index={props.index}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopCategories;
