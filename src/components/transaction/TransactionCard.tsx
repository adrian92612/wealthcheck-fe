import { formatNumber } from "@/lib/utils";
import { ArrowLeftRight, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TransactionFormDialog from "./TransactionFormDialog";
import TransactionDeleteBtn from "./TransactionDeleteBtn";
import type { Transaction } from "@/lib/types";
import { categoryIcons } from "@/constants/categoryIcons";
import { format } from "date-fns/format";
import { Button } from "../ui/button";

type Props = {
  tx: Transaction;
};
const TransactionCard = ({ tx }: Props) => {
  const Icon = tx.categoryIcon
    ? categoryIcons[tx.categoryIcon as keyof typeof categoryIcons]
    : null;

  return (
    <div className="flex items-center justify-between rounded-sm border p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          {Icon ? (
            <Icon className="size-5 text-gray-700" />
          ) : (
            <ArrowLeftRight className="size-5 text-gray-500" />
          )}
        </div>

        <div>
          <p className="font-medium">{tx.title}</p>
          {tx.type === "TRANSFER" ? (
            <p className="text-sm text-muted-foreground">
              {tx.fromWalletName} → {tx.toWalletName}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {tx.categoryName} • {tx.fromWalletName || tx.toWalletName}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="text-right">
          <p
            className={`font-bold ${
              tx.type === "INCOME"
                ? "text-green-600"
                : tx.type === "EXPENSE"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {tx.type === "EXPENSE" ? "-" : ""}
            {formatNumber(tx.amount)}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(tx.createdAt), "MMM d, yyyy")}
          </p>
        </div>
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
              <TransactionFormDialog transaction={tx} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <TransactionDeleteBtn transaction={tx} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TransactionCard;
