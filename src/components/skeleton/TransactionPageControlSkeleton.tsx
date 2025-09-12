import { Skeleton } from "../ui/skeleton";

const TransactionPageControlSkeleton = () => {
  return (
    <div className="flex justify-between gap-5 flex-wrap">
      <Skeleton className="w-48 h-9" />
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-9" />
        <Skeleton className="w-7 h-6" />
        <Skeleton className="w-10 h-9" />
      </div>
    </div>
  );
};

export default TransactionPageControlSkeleton;
