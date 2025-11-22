"use client";

import { qCacheKey } from "@/constants/queryKeys";
import { overviewApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import CurrentSummarySkeleton from "../skeleton/CurrentSummarySkeleton";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const colors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

const TopCategories = () => {
  const { data: response, isPending } = useQuery({
    queryKey: qCacheKey.topCategories,
    queryFn: overviewApi.getTopCategories,
    throwOnError: true,
  });

  if (isPending) return <CurrentSummarySkeleton />;
  if (!response?.success) {
    return <div>Something went wrong: {response?.message}</div>;
  }

  const chartData = response.data.topExpenseCategories;

  const finalChartData = chartData.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length], // assign slice colors
  }));

  const chartConfig: ChartConfig = chartData.reduce((acc, item, index) => {
    acc[item.name] = { label: item.name, color: colors[index % colors.length] };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="overflow-x-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[400px]"
        >
          <PieChart>
            <Pie
              data={finalChartData}
              dataKey="amount"
              nameKey="name"
              label={({ value }) => {
                const total = finalChartData.reduce(
                  (sum, item) => sum + item.amount,
                  0
                );
                const percent = ((value / total) * 100).toFixed(1);
                return `${percent}%`;
              }}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopCategories;
