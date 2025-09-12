import { Skeleton } from "../ui/skeleton";

const WalletCardSkeleton = () => {
  return (
    <div className="border rounded-xl flex-[1_0_300px] max-w-[300px] p-5">
      <Skeleton className="w-36 h-8 mb-8" />
      <div>
        <Skeleton className="w-36 h-5 mb-2" />
        <Skeleton className="w-48 h-8" />
      </div>
    </div>
  );
};

export default WalletCardSkeleton;
