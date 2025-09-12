import TransactionCardsBlockSkeleton from "./TransactionCardsBlockSkeleton";
import TransactionFiltersSkeleton from "./TransactionFiltersSkeleton";
import TransactionPageControlSkeleton from "./TransactionPageControlSkeleton";

const TransactionListSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 py-5">
      <TransactionFiltersSkeleton />
      <TransactionCardsBlockSkeleton />
      <TransactionPageControlSkeleton />
    </div>
  );
};

export default TransactionListSkeleton;
