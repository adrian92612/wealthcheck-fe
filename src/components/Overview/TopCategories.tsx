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
import { useMemo } from "react";

type ChartItem = {
  name: string;
  amount: number;
  fill: string;
};

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

const thisMonth = format(new Date(), "MMMM");

const CustomBarLabel = ({ y, item }: { y: number; item: ChartItem }) => (
  <>
    <text
      x={5}
      y={y - 6}
      textAnchor="start"
      className="fill-text font-medium text-xs"
    >
      {item.name}
    </text>
    <text x="100%" y={y - 6} textAnchor="end" className="fill-text text-xs">
      {formatNumber(item.amount)}
    </text>
  </>
);

const prepareChartData = (
  data: { name: string; amount: number }[],
  colors: string[]
): ChartItem[] =>
  data.map((item, index) => ({ ...item, fill: colors[index % colors.length] }));

const generateChartConfig = (data: ChartItem[], colors: string[]) =>
  data.reduce((acc, item, index) => {
    acc[item.name] = { label: item.name, color: colors[index % colors.length] };
    return acc;
  }, {} as ChartConfig);

type ChartBarProps = {
  data: ChartItem[];
  config: ChartConfig;
};

const ChartBar = ({ data, config }: ChartBarProps) => (
  <ChartContainer config={config} className="h-34 w-full p-2">
    <BarChart
      accessibilityLayer
      data={data}
      layout="vertical"
      margin={{ right: 100, top: 12 }}
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
          <CustomBarLabel y={props.y} item={data[props.index]} />
        )}
      />
    </BarChart>
  </ChartContainer>
);

const TopCategories = () => {
  const { data: response, isPending } = useQuery({
    queryKey: qCacheKey.topCategories,
    queryFn: overviewApi.getTopCategories,
    throwOnError: true,
  });

  const incomeChartData = useMemo(() => {
    if (!response?.success) return [];
    return prepareChartData(response.data.topIncomeCategories, incomeColors);
  }, [response]);

  const incomeChartConfig = useMemo(() => {
    if (!incomeChartData.length) return {};
    return generateChartConfig(incomeChartData, incomeColors);
  }, [incomeChartData]);

  const expenseChartData = useMemo(() => {
    if (!response?.success) return [];
    return prepareChartData(response.data.topExpenseCategories, expenseColors);
  }, [response]);

  const expenseChartConfig = useMemo(() => {
    if (!expenseChartData.length) return {};
    return generateChartConfig(expenseChartData, expenseColors);
  }, [expenseChartData]);

  if (isPending) return <div>Loading...</div>;
  if (!response?.success) {
    return <div>Something went wrong: {response?.message}</div>;
  }

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
          <ChartBar data={incomeChartData} config={incomeChartConfig} />
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
          <ChartBar data={expenseChartData} config={expenseChartConfig} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TopCategories;
