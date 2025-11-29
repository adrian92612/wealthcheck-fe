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
import { cn } from "@/lib/utils";

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

  const formattedDate = useMemo(
    () => format(new Date(tx.transactionDate), "MM/dd/yy hh:mm a"),
    [tx.transactionDate]
  );

  const typeColorClass = useMemo(() => {
    switch (tx.type) {
      case "INCOME":
        return {
          text: "text-primary",
          bg: "bg-primary/10",
          border: "border-l-primary/70",
          sign: "+",
        };
      case "EXPENSE":
        return {
          text: "text-destructive",
          bg: "bg-destructive/10",
          border: "border-l-destructive/70",
          sign: "-",
        };
      default:
        return {
          text: "text-blue-muted",
          bg: "bg-blue-muted/10",
          border: "border-l-blue-muted/70",
          sign: "",
        };
    }
  }, [tx.type]);

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md border shadow-md transition-shadow hover:shadow-lg overflow-x-auto",
        "border-border bg-card/70",
        typeColorClass.border,
        "border-l-2 p-2 sm:p-4"
      )}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full shrink-0",
            typeColorClass.bg
          )}
        >
          <Icon className={cn("size-5", typeColorClass.text)} />{" "}
        </div>

        <div className="truncate text-xs sm:text-base flex flex-col min-w-0">
          <p className="font-semibold truncate text-foreground">{tx.title}</p>
          {tx.type === "TRANSFER" ? (
            <p className="text-muted-foreground text-xs inline-flex gap-1 items-center">
              {fromLabel} <ArrowLeftRight size={12} className="text-gray-400" />{" "}
              {toLabel}
            </p>
          ) : (
            <p className="text-muted-foreground text-xs inline-flex gap-2 items-center">
              <span className="inline-flex items-center gap-1">
                <LucideTag size={12} className="text-gray-400" />{" "}
                {categoryLabel}
              </span>
              <span className="text-gray-300">•</span>
              <span className="inline-flex items-center gap-1">
                <LucideWallet size={12} className="text-gray-400" />{" "}
                {toLabel || fromLabel}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 pl-4">
        <div className="text-right">
          <p
            className={cn(
              "font-extrabold text-sm md:text-lg tracking-tight",
              typeColorClass.text
            )}
          >
            {typeColorClass.sign}
            {formatNumber(tx.amount)}
          </p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>

        <DropdownMenu open={dropDownOpen} onOpenChange={setDropDownOpen}>
          <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <Button
              variant="ghost"
              size="icon"
              className="p-1 size-8 rounded-full hover:bg-muted/70"
            >
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
