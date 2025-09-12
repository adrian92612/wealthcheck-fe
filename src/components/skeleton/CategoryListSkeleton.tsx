import { Skeleton } from "../ui/skeleton";
import CategoryCardSkeleton from "./CategoryCardSkeleton";

const CategoryListSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Skeleton className="p-4 rounded-lg h-14 w-28" />
        <Skeleton className="p-4 rounded-lg h-14 w-28" />
      </div>
      <ul className="flex flex-wrap justify-center sm:justify-start gap-5">
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
      </ul>
    </div>
  );
};

export default CategoryListSkeleton;
