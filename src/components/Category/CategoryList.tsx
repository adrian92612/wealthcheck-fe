import type { Category } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "@/lib/api";
import CategoryCard from "./CategoryCard";
import CategoryListSkeleton from "../skeleton/CategoryListSkeleton";
import { qCacheKey } from "@/constants/queryKeys";
import { useTrash } from "@/hooks/useIsTrash";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CategoryCountCard = ({
  title,
  count,
  Icon,
  color,
  statusText,
}: {
  title: string;
  count: number;
  Icon: LucideIcon;
  color: "green" | "red";
  statusText: string;
}) => {
  const baseClasses =
    "p-4 rounded-xl shadow-md border flex flex-col sm:flex-row items-start sm:items-center justify-between transition-colors duration-200 flex-1 min-w-[150px]";

  const colorClasses =
    color === "green"
      ? "bg-primary/5 dark:bg-primary/10 border-primary/20 dark:border-primary/50"
      : "bg-destructive/5 dark:bg-destructive/10 border-destructive/20 dark:border-destructive/50";

  const iconClasses =
    color === "green"
      ? "bg-primary/10 text-primary dark:bg-primary/30 dark:text-primary-foreground"
      : "bg-destructive/10 text-destructive dark:bg-destructive/30 dark:text-destructive-foreground";

  return (
    <div className={cn(baseClasses, colorClasses)}>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          {title} Categories
        </p>
        <p className="text-3xl font-bold text-foreground">{count}</p>
        <p className="text-xs text-muted-foreground italic whitespace-nowrap">
          {statusText}
        </p>
      </div>
      <div className={cn("p-2 rounded-lg shrink-0", iconClasses)}>
        <Icon className="size-6" />
      </div>
    </div>
  );
};

const CategoryList = () => {
  const { forSoftDeleted } = useTrash();
  const { data: response, isPending } = useQuery({
    queryKey: forSoftDeleted
      ? qCacheKey.trashedCategories
      : qCacheKey.categories,
    queryFn: forSoftDeleted
      ? categoryApi.fetchAllTrashed
      : categoryApi.fetchAll,
    throwOnError: true,
  });

  if (isPending) return <CategoryListSkeleton />;
  if (!response?.success) return <div>Error: {response?.message}</div>;

  const categories: Category[] = response.data;
  const incomeCount = categories.filter((c) => c.type === "INCOME").length;
  const expenseCount = categories.filter((c) => c.type === "EXPENSE").length;

  const activeIncomeText =
    incomeCount === 0
      ? "Time to add your first income source."
      : "Ready to track new income sources.";
  const activeExpenseText =
    expenseCount === 0
      ? "Time to define your first expense."
      : "Ready to track new expense items.";

  const trashText = "Awaiting restoration or permanent deletion.";

  const incomeStatusText = forSoftDeleted ? trashText : activeIncomeText;
  const expenseStatusText = forSoftDeleted ? trashText : activeExpenseText;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <CategoryCountCard
          title="Income"
          count={incomeCount}
          Icon={TrendingUp}
          color="green"
          statusText={incomeStatusText}
        />
        <CategoryCountCard
          title="Expense"
          count={expenseCount}
          Icon={TrendingDown}
          color="red"
          statusText={expenseStatusText}
        />
      </div>

      <ul className="flex flex-wrap justify-center sm:justify-start gap-5">
        {categories.map((category) => (
          <li key={category.id} className="flex-[1_0_300px] max-w-[300px]">
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
