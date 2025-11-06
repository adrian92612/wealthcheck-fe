import z from "zod";
import type {
  categorySchema,
  transactionSchema,
  walletSchema,
} from "./schemas";
import type { ElementType } from "react";

export type User = {
  email: string;
  name: string;
  avatarUrl: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

export type Menu = {
  label: string;
  link: string;
  icon: ElementType;
};

type BaseEntity = {
  id: number | string;
  createdAt: string;
  updatedAt: string;
};

export type Category = BaseEntity & {
  name: string;
  description: string;
  type: CategoryType;
  icon: string;
};

export type Transaction = BaseEntity & {
  type: TransactionType;
  fromWalletId?: number;
  toWalletId?: number;
  categoryId?: number;
  fromWalletName?: string;
  toWalletName?: string;
  categoryName?: string;
  categoryIcon?: string;
  title: string;
  notes?: string;
  amount: number;
};

export type Wallet = BaseEntity & {
  name: string;
  balance: number;
};

export type CategoryFormData = z.infer<typeof categorySchema>;
export const categoryTypes = ["INCOME", "EXPENSE"] as const;
export type CategoryType = (typeof categoryTypes)[number];

export type TransactionFilterType = {
  page: number | null;
  size: number | null;
  type: TransactionType | null;
  walletId: number | null;
  categoryId: number | null;
  fromDate: string | null;
  toDate: string | null;
  search: string | null;
};

export type TransactionFilterResType = {
  transactions: Transaction[];
  filters: TransactionFilterType;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

export type TransactionFormData = z.infer<typeof transactionSchema>;
export const transactionTypes = ["INCOME", "EXPENSE", "TRANSFER"] as const;
export type TransactionType = (typeof transactionTypes)[number];

export type WalletFormData = z.infer<typeof walletSchema>;

export type CurrentSummary = {
  totalBalance: number;
  incomeThisMonth: number;
  expenseThisMonth: number;
  netCashFlow: number;
};

export type TopTransaction = {
  type: TransactionType;
  categoryName: string;
  amount: number;
};

export type OverviewTopTransaction = {
  topIncome: TopTransaction[];
  topExpense: TopTransaction[];
};
