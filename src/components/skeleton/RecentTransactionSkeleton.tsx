import { Skeleton } from "../ui/skeleton";

const RecentTransactionSkeleton = () => {
  return (
    <div className="min-h-96 p-5 xl:col-span-2 border rounded-sm">
      <Skeleton className="h-10 w-40 mb-5" />
      <div className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
};

export default RecentTransactionSkeleton;
