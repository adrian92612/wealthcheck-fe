import { useQuery } from "@tanstack/react-query";
import { ChartContainer, ChartTooltip, type ChartConfig } from "../ui/chart";
import { qCacheKey } from "@/constants/queryKeys";
import { overviewApi } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";
import { formatNumber } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { memo, useCallback, useMemo, useState, useEffect, useRef } from "react";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const chartConfig = {
  net: {
    label: "Daily Net",
  },
} satisfies ChartConfig;

const DailyNet = () => {
  const { data: response, isPending } = useQuery({
    queryKey: qCacheKey.dailySnapshot,
    queryFn: overviewApi.getDailySnapshot,
    throwOnError: true,
  });

  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        setIsResizing(false);
      }, 200);
    };

    const resizeObserver = new ResizeObserver(handleResize);

    const mainElement = document.querySelector("main.flex-1");
    if (mainElement) {
      resizeObserver.observe(mainElement);
    }

    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  const renderTooltip = useCallback(
    (props: TooltipProps<ValueType, NameType>) => {
      const { active, payload } = props;
      if (!active || !payload || payload.length === 0) return null;

      const data = payload[0].payload;
      const date = format(parseISO(data.date), "MM/dd/yyyy");
      const net = formatNumber(data.net);

      return (
        <div className="bg-white p-2 rounded shadow border">
          <div className="font-semibold">{date}</div>
          <div>Net: {net}</div>
        </div>
      );
    },
    []
  );

  const { chartData, finalNet, lineColor, stats } = useMemo(() => {
    if (!response?.success) {
      return {
        chartData: [],
        finalNet: 0,
        lineColor: "var(--primary)",
        stats: { max: 0, min: 0, avg: 0 },
      };
    }

    const chartData = response.data;
    const validData = chartData.filter((item) => item.net !== null);
    const finalNet =
      validData.length > 0 ? validData[validData.length - 1].net : 0;
    const lineColor = finalNet < 0 ? "var(--destructive)" : "var(--primary)";

    const stats = {
      max: Math.max(...validData.map((d) => d.net)),
      min: Math.min(...validData.map((d) => d.net)),
      avg: validData.reduce((acc, d) => acc + d.net, 0) / validData.length,
    };

    return { chartData, finalNet, lineColor, stats };
  }, [response]);

  const xAxisTickFormatter = useCallback((value: string) => {
    return new Date(value).getDate().toString();
  }, []);

  const yAxisTickFormatter = useCallback((value: number) => {
    if (value === null || value === undefined) return "";
    return formatNumber(value);
  }, []);

  const chartMargin = useMemo(
    () => ({
      left: 12,
      right: 12,
      top: 30,
    }),
    []
  );

  if (isPending) return <div>Loading...</div>;

  if (!response?.success) {
    return <div>Something went wrong: {response?.message}</div>;
  }

  return (
    <div ref={containerRef} className="w-full">
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Monthly Cumulative Net</CardTitle>
          <CardDescription>
            Tracks cumulative net inflows and outflows for{" "}
            {new Date().toLocaleString("default", { month: "long" })},
            highlighting trends and negative balance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isResizing ? (
            <div className="h-40 w-full flex items-center justify-center text-primary">
              <div className="animate-pulse">Updating chart...</div>
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="h-40 w-full">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={chartMargin}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={true}
                  axisLine={true}
                  tickMargin={4}
                  fontSize={8}
                  tickFormatter={xAxisTickFormatter}
                />
                <YAxis
                  dataKey="net"
                  tickLine={true}
                  axisLine={true}
                  tickMargin={1}
                  width={50}
                  fontSize={8}
                  tickFormatter={yAxisTickFormatter}
                />
                <ChartTooltip cursor={false} content={renderTooltip} />

                <Line
                  dataKey="net"
                  type="linear"
                  stroke={lineColor}
                  strokeWidth={1.5}
                  dot={true}
                  connectNulls={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-1 text-xs text-muted-foreground">
          <div>
            Final Net:&nbsp;
            <span className={finalNet < 0 ? "text-red-500" : "text-green-600"}>
              {formatNumber(finalNet)}
            </span>
          </div>

          <div>Biggest Gain: {formatNumber(stats.max)}</div>
          <div>Biggest Drop: {formatNumber(stats.min)}</div>
          <div>Daily Avg: {formatNumber(stats.avg)}</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default memo(DailyNet);
