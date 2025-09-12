import { Skeleton } from "../ui/skeleton";

const TransactionCardsBlockSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
    </div>
  );
};

export default TransactionCardsBlockSkeleton;
