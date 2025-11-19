import type { Category } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "@/lib/api";
import CategoryCard from "./CategoryCard";
import CategoryListSkeleton from "../skeleton/CategoryListSkeleton";
import { qCacheKey } from "@/constants/queryKeys";
import { useTrash } from "@/hooks/useIsTrash";

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

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="p-4 rounded-lg bg-green-100 text-green-800">
          Income: {incomeCount}
        </div>
        <div className="p-4 rounded-lg bg-red-100 text-red-800">
          Expense: {expenseCount}
        </div>
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
