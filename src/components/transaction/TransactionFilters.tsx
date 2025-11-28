import {
  transactionTypes,
  type TransactionFilterType,
  type TransactionType,
} from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { capitalizeFirstLetter } from "@/lib/utils";
import { DateRangePicker } from "../ui/date-range-picker";
import { format } from "date-fns/format";
import { Button } from "../ui/button";
import { LucideRefreshCw, LucideSearch } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryApi, walletApi } from "@/lib/api";
import TransactionFiltersSkeleton from "../skeleton/TransactionFiltersSkeleton";
import { qCacheKey } from "@/constants/queryKeys";
import { Card, CardContent } from "../ui/card";

type Props = {
  filter: TransactionFilterType;
  onFilterChange: (newFilter: Partial<TransactionFilterType>) => void;
  refetch: () => void;
  handleReset: () => void;
};

const TransactionFilters = ({
  filter,
  onFilterChange,
  refetch,
  handleReset,
}: Props) => {
  const { data: walletResp, isPending: wPending } = useQuery({
    queryKey: qCacheKey.wallets,
    queryFn: walletApi.fetchAll,
    throwOnError: true,
  });
  const { data: catResp, isPending: cPending } = useQuery({
    queryKey: qCacheKey.categories,
    queryFn: categoryApi.fetchAll,
    throwOnError: true,
  });
  const [localSearch, setLocalSearch] = useState(filter.search ?? "");

  const debounced = useDebouncedCallback((value: string) => {
    onFilterChange({ search: value });
  }, 300);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const handleFilterReset = () => {
    setLocalSearch("");
    handleReset();
  };

  if (wPending || cPending) return <TransactionFiltersSkeleton />;
  if (!walletResp?.success || !catResp?.success)
    return <div>Error loading filters</div>;

  const wallets = walletResp.data;
  const categories = catResp.data;

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end gap-5">
            <div className="flex flex-col gap-2">
              <Label>Keyword</Label>
              <Input
                placeholder="Search description"
                className="w-48"
                value={localSearch}
                onChange={({ target }) => {
                  setLocalSearch(target.value);
                  debounced(target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Wallet</Label>
              <Select
                value={
                  filter.walletId != null ? String(filter.walletId) : "all"
                }
                onValueChange={(value) =>
                  onFilterChange({
                    walletId: value === "all" ? null : Number(value),
                  })
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {!!wallets.length &&
                    wallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={String(wallet.id)}>
                        {wallet.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <Select
                value={
                  filter.categoryId != null ? String(filter.categoryId) : "all"
                }
                onValueChange={(value) =>
                  onFilterChange({
                    categoryId: value === "all" ? null : Number(value),
                  })
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {!!categories.length &&
                    categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Type</Label>

              <Select
                value={filter.type ?? "all"}
                onValueChange={(value) =>
                  onFilterChange({
                    type: value === "all" ? null : (value as TransactionType),
                  })
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {!!transactionTypes.length &&
                    transactionTypes.map((type, i) => (
                      <SelectItem key={i} value={type}>
                        {capitalizeFirstLetter(type)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Date Range</Label>
              <DateRangePicker
                value={{
                  from: filter.fromDate
                    ? new Date(filter.fromDate)
                    : new Date(),
                  to: filter.toDate ? new Date(filter.toDate) : undefined,
                }}
                onUpdate={({ range }) => {
                  onFilterChange({
                    fromDate: range?.from
                      ? format(range.from, "yyyy-MM-dd")
                      : null,
                    toDate: range?.to ? format(range.to, "yyyy-MM-dd") : null,
                  });
                }}
                initialDateFrom={
                  filter.fromDate ? new Date(filter.fromDate) : undefined
                }
                initialDateTo={
                  filter.toDate ? new Date(filter.toDate) : undefined
                }
                align="start"
                locale="en-PH"
                showCompare={false}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button variant="outline" type="button" onClick={handleFilterReset}>
              <LucideRefreshCw size={16} className="mr-2" />
              Reset Filters
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <LucideSearch size={16} className="mr-2" />
              Search
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionFilters;
