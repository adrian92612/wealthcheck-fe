import { Skeleton } from "../ui/skeleton";

const CurrentSummarySkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 place-items-stretch">
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
    </div>
  );
};

export default CurrentSummarySkeleton;
