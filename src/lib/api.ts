import { apiEndpoints } from "@/constants/apiEndpoints";
import { apiFetch, makeCrudApi } from "./apiClient";
import type {
  Wallet,
  WalletFormData,
  Category,
  CategoryFormData,
  Transaction,
  TransactionFormData,
  CurrentSummary,
  OverviewTopTransaction,
  TransactionFilterResType,
  DailyNetCumulative,
  TopCategories,
} from "./types";

export const walletApi = makeCrudApi<Wallet, WalletFormData>(
  apiEndpoints.wallet
);

export const categoryApi = makeCrudApi<Category, CategoryFormData>(
  apiEndpoints.category
);

export const transactionApi = makeCrudApi<
  Transaction,
  TransactionFormData,
  TransactionFilterResType
>(apiEndpoints.transaction);

export const overviewApi = {
  getCurrentSummary: () =>
    apiFetch<CurrentSummary>(apiEndpoints.overview.currentSummary),
  getRecentTransactions: () =>
    apiFetch<Transaction[]>(apiEndpoints.overview.recentTransactions),
  getTopTransactions: () =>
    apiFetch<OverviewTopTransaction>(apiEndpoints.overview.topTransactions),
  getDailySnapshot: () =>
    apiFetch<DailyNetCumulative>(apiEndpoints.overview.dailyNetSnapshot),
  getTopCategories: () =>
    apiFetch<TopCategories>(apiEndpoints.overview.topCategories),
};
