import { Skeleton } from "../ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-dvh flex w-full">
      <Skeleton className="hidden md:block w-56" />
      <div className="flex-1 h-dvh p-5">
        <div className="space-y-5">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-2/3" />

          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
