import WalletCardSkeleton from "./WalletCardSkeleton";
import WalletSummaryCardSkeleton from "./WalletSummaryCardSkeleton";

const WalletListSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-5">
      <WalletSummaryCardSkeleton />
      <WalletCardSkeleton />
      <WalletCardSkeleton />
      <WalletCardSkeleton />
      <WalletCardSkeleton />
    </div>
  );
};

export default WalletListSkeleton;
