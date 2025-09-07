import type { Category } from "@/lib/types/category";
import { useQuery } from "@tanstack/react-query";
import CategoryFormDialog from "./CategoryFormDialog";
import CategoryDeleteBtn from "./CategoryDeleteBtn";
import { categoryApi } from "@/lib/api";

const CategoryList = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["categories"], queryFn: categoryApi.fetchAll });

  if (isLoading) return <div>Loading wallet list...</div>;
  if (isError) return <div>Network error</div>;
  if (!response?.success) return <div>Error: {response?.message}</div>;

  const categories: Category[] = response.data;

  return (
    <div>
      {!!categories.length &&
        categories.map((category) => {
          return (
            <div key={category.id}>
              <p>{category.icon}</p>
              <p>{category.name}</p>
              <p>{category.description}</p>
              <p>{category.type}</p>
              <p>{category.createdAt}</p>
              <p>{category.updatedAt}</p>
              <CategoryFormDialog category={category} />
              <CategoryDeleteBtn category={category} />
            </div>
          );
        })}
    </div>
  );
};

export default CategoryList;
