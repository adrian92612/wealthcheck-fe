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
import { useState } from "react";
import DeleteBtn from "../common/DeleteBtn";
import { walletApi } from "@/lib/api";
import { qCacheKey } from "@/constants/queryKeys";
import { useTrash } from "@/hooks/useIsTrash";
import RestoreBtn from "../common/RestoreBtn";

type Props = {
  wallet: Wallet;
};
const WalletCard = ({ wallet }: Props) => {
  const [openWallet, setOpenWallet] = useState(false);
  const [openDropDrown, setOpenDropDown] = useState(false);
  const { forSoftDeleted } = useTrash();
  const keysToInvalidate = [qCacheKey.wallets, qCacheKey.trashedWallets];
  return (
    <Card className="rounded-xl shadow-lg border-l-2 border-primary bg-background">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{wallet.name}</CardTitle>
          <DropdownMenu open={openDropDrown} onOpenChange={setOpenDropDown}>
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
                {forSoftDeleted ? (
                  <RestoreBtn
                    id={wallet.id}
                    label="wallet"
                    name={wallet.name}
                    restoreFn={walletApi.restore}
                    invalidateKeys={keysToInvalidate}
                  />
                ) : (
                  <WalletFormDialog
                    wallet={wallet}
                    open={openWallet}
                    onOpenChange={setOpenWallet}
                    refreshUser={() => {}}
                    closeDropDown={() => setOpenDropDown(false)}
                  />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteBtn
                  id={wallet.id}
                  label="wallet"
                  name={wallet.name}
                  softDeleteFn={walletApi.delete}
                  deleteFn={walletApi.permanentDelete}
                  invalidateKeys={keysToInvalidate}
                />
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
