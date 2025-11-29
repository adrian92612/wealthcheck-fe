import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatNumber } from "@/lib/utils";
import type { Wallet } from "@/lib/types";
import { Pie, PieChart } from "recharts";
import { LucideWallet } from "lucide-react";
import { cn } from "@/lib/utils";

const colors = [
  "oklch(0.50 0.08 240)", // Blue
  "oklch(0.65 0.08 340)", // Pink
  "oklch(0.50 0.08 80)", // Gold
  "oklch(0.65 0.08 140)", // Green
  "oklch(0.70 0.10 240)", // Lighter Blue
  "oklch(0.50 0.08 340)", // Darker Pink
  "oklch(0.65 0.08 80)", // Medium Gold
  "oklch(0.50 0.08 140)", // Darker Green
  "oklch(0.80 0.09 280)", // Light Lavender
  "oklch(0.80 0.09 180)", // Light Aqua
];

type ChartItem = {
  name: string;
  balance: number;
  fill: string;
  percentage: number;
};

type ChartPieProps = {
  data: ChartItem[];
  config: ChartConfig;
};

const prepareChartData = (
  data: Wallet[],
  totalBalance: number,
  colors: string[]
): ChartItem[] =>
  data
    .map((item, index) => ({
      ...item,
      fill: colors[index % colors.length],
      percentage: totalBalance > 0 ? (item.balance / totalBalance) * 100 : 0,
    }))
    .sort((a, b) => b.balance - a.balance);

const generateChartConfig = (data: ChartItem[]) =>
  data.reduce((acc, item) => {
    acc[item.name] = { label: item.name, color: item.fill };
    return acc;
  }, {} as ChartConfig);

const ChartPie = ({ data, config }: ChartPieProps) => {
  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square h-[150px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="balance"
          nameKey="name"
          innerRadius={40}
          outerRadius={70}
          paddingAngle={2}
        />
      </PieChart>
    </ChartContainer>
  );
};

type Props = {
  wallets: Wallet[];
};

const WalletSummaryCard = ({ wallets }: Props) => {
  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);
  const data = prepareChartData(wallets, totalBalance, colors);
  const config = generateChartConfig(data);

  if (!totalBalance && wallets.length === 0) {
    return (
      <Card className="md:col-span-2 lg:col-span-3 2xl:col-span-4 2xl:min-w-10/12 2xl:mx-auto shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            <CardTitle className="text-xl font-semibold tracking-tight">
              Total Balance Summary
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="p-4 rounded-lg bg-primary/5">
            <p className="text-sm text-muted-foreground font-medium mb-1">
              Total Balance Across 0 Wallets
            </p>
            <p className="text-4xl font-extrabold text-primary">
              {formatNumber(0)}
            </p>
          </div>
          <p className="mt-4 text-center text-muted-foreground">
            No wallets created yet. Start by adding one!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="md:col-span-2 lg:col-span-3 2xl:col-span-4 2xl:min-w-10/12 2xl:mx-auto shadow-xl border-primary/30">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
          <CardTitle className="text-xl font-semibold tracking-tight">
            Total Balance Summary
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-0">
        <div className="flex flex-col justify-center">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm text-muted-foreground font-medium mb-1 flex items-center gap-2">
              <LucideWallet className="size-4 text-primary" />
              Total Balance Across {wallets.length} Wallets
            </p>
            <p className="text-5xl font-extrabold text-primary tracking-tight mt-1">
              {formatNumber(totalBalance)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Showing breakdown for wallets with positive balances.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center lg:col-span-1 md:col-span-2">
          <ChartPie data={data} config={config} />
        </div>

        <div className="lg:col-span-1 md:col-span-2 md:order-last lg:order-0">
          <h3 className="text-lg font-semibold text-foreground">
            Wallet Breakdown
          </h3>
          <ul className="max-h-[220px] overflow-y-auto pr-2">
            {data.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between p-1 px-2 rounded-lg transition-colors hover:bg-secondary/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  ></div>
                  <span className="text-sm font-medium">
                    {item.name}
                    <span className="text-muted-foreground ml-2 text-xs">
                      ({item.percentage.toFixed(1)}%)
                    </span>
                  </span>
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    item.balance < 0 ? "text-red-500" : "text-foreground"
                  )}
                >
                  {formatNumber(item.balance)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletSummaryCard;
