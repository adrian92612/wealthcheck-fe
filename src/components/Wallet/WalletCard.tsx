import type { Wallet } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import { formatNumber } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import WalletFormDialog from "./WalletFormDialog";
import WalletDeleteBtn from "./WalletDeleteBtn";

type Props = {
  wallet: Wallet;
};
const WalletCard = ({ wallet }: Props) => {
  return (
    <Card className="rounded-xl shadow-lg border-l-2 border-primary bg-background">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{wallet.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer">
              <Button
                variant="ghost"
                size="icon"
                className="p-1 size-7 rounded-full hover:bg-muted"
              >
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-center">
                More Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <WalletFormDialog wallet={wallet} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <WalletDeleteBtn wallet={wallet} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-muted">Balance</p>
        <p className="text-2xl font-bold text-green-600">
          {formatNumber(wallet.balance)}
        </p>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
