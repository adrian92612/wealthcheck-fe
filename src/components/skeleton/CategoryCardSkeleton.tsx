import { Skeleton } from "../ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <div className="border flex flex-col rounded-sm shadow-sm gap-2 p-4 flex-[1_0_300px] max-w-[300px]">
      <div>
        <Skeleton className="w-20 h-6 mb-2" />
        <Skeleton className="w-40 h-5" />
      </div>

      <Skeleton className="w-20 h-8 rounded-2xl" />
    </div>
  );
};

export default CategoryCardSkeleton;
