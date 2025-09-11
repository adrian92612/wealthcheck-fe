import type { Category } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "@/lib/api";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
  const {
    data: response,
    isPending,
    error,
  } = useQuery({ queryKey: ["categories"], queryFn: categoryApi.fetchAll });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error has occured: {error.message}</div>;
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

      {/* Category Grid */}
      <ul className="flex flex-wrap justify-center sm:justify-start gap-5">
        {categories.map((category) => (
          <li
            key={category.id}
            className="shadow-md flex-[1_0_300px] max-w-[300px]"
          >
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
