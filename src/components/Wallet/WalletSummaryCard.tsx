import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatNumber } from "@/lib/utils";
import type { Wallet } from "@/lib/types";

type Props = {
  wallets: Wallet[];
};

const WalletSummaryCard = ({ wallets }: Props) => {
  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);

  return (
    <Card className="w-full shadow-lg bg-amber-200/10 text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Total Balance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-5 justify-between">
        <div>
          <p className="text-3xl font-bold">{formatNumber(totalBalance)}</p>
          <p className="text-sm opacity-80 mb-4">
            Across {wallets.length} wallets
          </p>
        </div>

        <div className="flex flex-col flex-wrap items-start max-h-none sm:max-h-16 gap-x-6">
          {wallets.map((wallet) => {
            const percent =
              totalBalance > 0
                ? ((wallet.balance / totalBalance) * 100).toFixed(1)
                : "0";
            return (
              <div
                key={wallet.id}
                className="flex items-center justify-between w-32 gap-5"
              >
                <span className="text-sm truncate font-bold">
                  {wallet.name}
                </span>
                <span className="text-sm font-medium text-text-muted italic">
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletSummaryCard;
