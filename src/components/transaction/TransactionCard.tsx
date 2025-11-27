import { formatNumber } from "@/lib/utils";
import {
  ArrowLeftRight,
  LucideTag,
  LucideWallet,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TransactionFormDialog from "./TransactionFormDialog";
import type { Transaction } from "@/lib/types";
import { categoryIcons } from "@/constants/categoryIcons";
import { format } from "date-fns/format";
import { Button } from "../ui/button";
import { useTrash } from "@/hooks/useIsTrash";
import RestoreBtn from "../common/RestoreBtn";
import { transactionApi } from "@/lib/api";
import { qCacheKey } from "@/constants/queryKeys";
import DeleteBtn from "../common/DeleteBtn";
import { memo, useMemo, useState, type JSX } from "react";

const keysToInvalidate = [
  qCacheKey.transactions,
  qCacheKey.trashedTransactions,
  qCacheKey.moneyGoal,
  qCacheKey.moneyBudget,
  qCacheKey.recentTransactions,
  qCacheKey.topTransactions,
  qCacheKey.currentSummary,
  qCacheKey.dailySnapshot,
  qCacheKey.topCategories,
];

const DeletedMarker = ({ what }: { what: "Wallet" | "Category" }) => (
  <span className="text-red-500 italic flex items-center gap-1">
    {what === "Category" ? (
      <LucideTag className="size-3" />
    ) : (
      <LucideWallet className="size-3" />
    )}
    <span className="sr-only">{what} deleted</span>
  </span>
);

type WalletOrCategoryLabel = string | JSX.Element | null;

const labelOrDeleted = (
  name: string | null | undefined,
  id: number | null | undefined,
  type: "Wallet" | "Category"
): WalletOrCategoryLabel => {
  if (name) return name;
  if (id != null) return <DeletedMarker what={type} />;
  return null;
};

const getCategoryIcon = (iconKey?: string) => {
  if (!iconKey) return ArrowLeftRight;
  return categoryIcons[iconKey as keyof typeof categoryIcons] ?? ArrowLeftRight;
};

type Props = {
  tx: Transaction;
};

const TransactionCard = ({ tx }: Props) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { forSoftDeleted } = useTrash();

  const Icon = getCategoryIcon(tx.categoryIcon);

  const hasDeletedWallet = useMemo(
    () =>
      (tx.fromWalletId != null && !tx.fromWalletName) ||
      (tx.toWalletId != null && !tx.toWalletName),
    [tx.fromWalletId, tx.fromWalletName, tx.toWalletId, tx.toWalletName]
  );

  const categoryLabel = useMemo(
    () => labelOrDeleted(tx.categoryName, tx.categoryId, "Category"),
    [tx.categoryName, tx.categoryId]
  );

  const fromLabel = useMemo(
    () => labelOrDeleted(tx.fromWalletName, tx.fromWalletId, "Wallet"),
    [tx.fromWalletName, tx.fromWalletId]
  );
  const toLabel = useMemo(
    () => labelOrDeleted(tx.toWalletName, tx.toWalletId, "Wallet"),
    [tx.toWalletName, tx.toWalletId]
  );

  const walletLabel = useMemo(() => {
    if (tx.type === "INCOME") return toLabel;
    if (tx.type === "EXPENSE") return fromLabel;
    return `${fromLabel} → ${toLabel}`;
  }, [tx.type, fromLabel, toLabel]);

  const formattedDate = useMemo(
    () => format(new Date(tx.transactionDate), "MMM d, yyyy hh:mm a"),
    [tx.transactionDate]
  );

  const amountClass = useMemo(() => {
    switch (tx.type) {
      case "INCOME":
        return "text-primary";
      case "EXPENSE":
        return "text-destructive";
      default:
        return "text-blue-muted";
    }
  }, [tx.type]);

  return (
    <div className="flex items-center text-sm sm:text-base justify-between rounded-sm border border-secondary/10 bg-secondary/5 p-3 shadow-sm gap-5 overflow-x-auto">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Icon className="size-5 text-gray-700" />
        </div>

        <div className="text-xs sm:text-base">
          <p className="font-medium">{tx.title}</p>
          {tx.type === "TRANSFER" ? (
            <p className="text-muted-foreground inline-flex gap-1">
              {fromLabel} → {toLabel}
            </p>
          ) : (
            <p className="text-muted-foreground inline-flex gap-1">
              {categoryLabel} • {walletLabel}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="text-right">
          <p className={`font-bold ${amountClass}`}>
            {tx.type === "EXPENSE" ? "-" : ""}
            {formatNumber(tx.amount)}
          </p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>

        <DropdownMenu open={dropDownOpen} onOpenChange={setDropDownOpen}>
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
                  id={tx.id}
                  label="transaction"
                  name={tx.title}
                  restoreFn={transactionApi.restore}
                  invalidateKeys={keysToInvalidate}
                  hasDeletedWallet={hasDeletedWallet}
                />
              ) : (
                <TransactionFormDialog
                  transaction={tx}
                  hasDeletedWallet={hasDeletedWallet}
                  closeDropDown={() => setDropDownOpen(false)}
                />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteBtn
                id={tx.id}
                label="transaction"
                name={tx.title}
                softDeleteFn={transactionApi.delete}
                deleteFn={transactionApi.permanentDelete}
                invalidateKeys={keysToInvalidate}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default memo(TransactionCard);
