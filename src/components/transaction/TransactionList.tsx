import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionApi } from "@/lib/api";
import { useState } from "react";
import { type TransactionFilterType } from "@/lib/types";
import TransactionFilters from "./TransactionFilters";
import TransactionPageControl from "./TransactionPageControl";
import TransactionCardsBlock from "./TransactionCardsBlock";
import TransactionListSkeleton from "../skeleton/TransactionListSkeleton";
import { initialFilter } from "./constants";
import { useTrash } from "@/hooks/useIsTrash";
import { qCacheKey } from "@/constants/queryKeys";

const TransactionList = () => {
  const [filter, setFilter] = useState<TransactionFilterType>(initialFilter);
  const { forSoftDeleted } = useTrash();

  const queryClient = useQueryClient();
  const qKey = forSoftDeleted
    ? qCacheKey.trashedTransactions
    : qCacheKey.transactions;

  const qFn = forSoftDeleted
    ? transactionApi.fetchAllTrashed
    : transactionApi.fetchAll;

  const {
    data: txResp,
    isPending: txPending,
    refetch,
  } = useQuery({
    queryKey: qKey,
    queryFn: () => qFn(filter),
    throwOnError: true,
  });

  if (txPending) return <TransactionListSkeleton />;
  if (!txResp?.success) return <div>Error: {txResp?.message}</div>;

  const transactions = txResp.data.transactions;

  const handleFilterChange = (update: Partial<TransactionFilterType>) => {
    setFilter((prev) => ({ ...prev, ...update }));
  };

  const handleReset = () => {
    setFilter(initialFilter);
    qFn(initialFilter).then((data) => {
      queryClient.setQueryData(qKey, data);
    });
  };

  const handlePageChange = (newPage: number) => {
    const newFilter = { ...filter, page: newPage };
    setFilter(newFilter);
    qFn(newFilter).then((data) => {
      queryClient.setQueryData(qKey, data);
    });
  };

  const handlePageSizeChange = (size: number) => {
    const newFilter = { ...filter, size, page: 1 };
    setFilter(newFilter);
    qFn(newFilter).then((data) => {
      queryClient.setQueryData(qKey, data);
    });
  };

  return (
    <div className="flex flex-col gap-5 pb-5">
      <TransactionFilters
        filter={filter}
        onFilterChange={handleFilterChange}
        refetch={refetch}
        handleReset={handleReset}
      />

      <TransactionCardsBlock
        transactions={transactions}
        totalItems={txResp.data.totalItems}
      />

      {!!txResp.data.totalPages && (
        <TransactionPageControl
          filter={filter}
          txResp={txResp.data}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default TransactionList;
