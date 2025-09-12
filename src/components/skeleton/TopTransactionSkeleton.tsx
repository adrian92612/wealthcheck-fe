import { Skeleton } from "../ui/skeleton";

const TopTransactionSkeleton = () => {
  return (
    <div className="min-h-96 xl:col-span-3 border p-5">
      <Skeleton className="h-10 w-40 mb-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      </div>
    </div>
  );
};

export default TopTransactionSkeleton;
