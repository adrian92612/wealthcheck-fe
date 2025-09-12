import { Skeleton } from "../ui/skeleton";

const TransactionFiltersSkeleton = () => {
  return (
    <div className="flex flex-wrap items-end gap-5">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-48" />
        <Skeleton className="h-10 max-w-96 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

export default TransactionFiltersSkeleton;
