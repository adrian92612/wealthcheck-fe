import type { TransactionFilterType } from "@/lib/types";
import { format } from "date-fns";

export const initialFilter: TransactionFilterType = {
  page: 1,
  size: 10,
  categoryId: null,
  walletId: null,
  fromDate: format(new Date(2000, 0, 1), "yyyy-MM-dd"),
  toDate: format(new Date(), "yyyy-MM-dd"),
  type: null,
  search: null,
};
