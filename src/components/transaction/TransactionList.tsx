import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionApi } from "@/lib/api";
import { useState } from "react";
import { type TransactionFilterType } from "@/lib/types";
import TransactionFilters from "./TransactionFilters";
import TransactionPageControl from "./TransactionPageControl";
import TransactionCardsBlock from "./TransactionCardsBlock";
import TransactionListSkeleton from "../skeleton/TransactionListSkeleton";
import { initialFilter } from "./constants";

const TransactionList = () => {
  const [filter, setFilter] = useState<TransactionFilterType>(initialFilter);

  const queryClient = useQueryClient();
  const {
    data: txResp,
    isPending: txPending,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionApi.fetchAll(filter),
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
    transactionApi.fetchAll(initialFilter).then((data) => {
      queryClient.setQueryData(["transactions"], data);
    });
  };

  const handlePageChange = (newPage: number) => {
    const newFilter = { ...filter, page: newPage };
    setFilter(newFilter);
    transactionApi.fetchAll(newFilter).then((data) => {
      queryClient.setQueryData(["transactions"], data);
    });
  };

  const handlePageSizeChange = (size: number) => {
    const newFilter = { ...filter, size, page: 1 };
    setFilter(newFilter);
    transactionApi.fetchAll(newFilter).then((data) => {
      queryClient.setQueryData(["transactions"], data);
    });
  };

  return (
    <div className="flex flex-col gap-5 py-5">
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
