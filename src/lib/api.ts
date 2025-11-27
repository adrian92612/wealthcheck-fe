import { apiEndpoints } from "@/constants/apiEndpoints";
import { apiFetch } from "./apiClient";
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
  MoneyGoal,
  MoneyGoalFormData,
} from "./types";
import { toQueryString } from "./utils";

const makeCrudApi = <T, TForm = Partial<T>, TList = T[]>(base: string) => ({
  fetchAll: (params?: Record<string, unknown>) => {
    const qs = params ? `?${toQueryString(params)}` : "";
    return apiFetch<TList>(`${base}${qs}`);
  },
  fetchAllTrashed: (params?: Record<string, unknown>) => {
    const qs = params ? `?${toQueryString(params)}` : "";
    return apiFetch<TList>(`${base}/deleted${qs}`);
  },
  fetchById: (id: number | string) => apiFetch<T>(`${base}/${id}`),
  create: (data: TForm) =>
    apiFetch<T>(base, { method: "POST", body: JSON.stringify(data) }),
  update: (id: number | string, data: TForm) =>
    apiFetch<T>(`${base}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number | string) =>
    apiFetch<T>(`${base}/${id}`, { method: "DELETE" }),
  permanentDelete: (id: number | string) =>
    apiFetch<T>(`${base}/permanent-delete/${id}`, { method: "DELETE" }),
  restore: (id: number | string) =>
    apiFetch<T>(`${base}/restore/${id}`, { method: "PUT" }),
});

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
  getMoneyGoal: () => apiFetch<MoneyGoal>(apiEndpoints.overview.moneyGoal),
  updateMoneyGoal: (data: MoneyGoalFormData) =>
    apiFetch<MoneyGoal>(apiEndpoints.overview.moneyGoal, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
