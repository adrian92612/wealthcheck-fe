import z from "zod";
import type {
  categorySchema,
  moneyBudgetSchema,
  moneyGoalSchema,
  transactionSchema,
  walletSchema,
} from "./schemas";
import type { ElementType } from "react";

export type User = {
  email: string;
  name: string;
  avatarUrl: string;
  isNewUser: boolean;
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
  transactionDate: Date;
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
export type MoneyGoalFormData = z.infer<typeof moneyGoalSchema>;
export type MoneyBudgetFormData = z.infer<typeof moneyBudgetSchema>;

export type CurrentSummary = {
  totalBalance: number;
  percentageDifference: number;
  dailyAverageSpending: number;
  lastMonthBalance: number;
};

export type OverviewTopTransaction = {
  topIncome: Transaction[];
  topExpense: Transaction[];
};

export type DailyNetCumulative = {
  date: string;
  net: number;
}[];

export type TopCategories = {
  topIncomeCategories: {
    name: string;
    amount: number;
  }[];
  topExpenseCategories: {
    name: string;
    amount: number;
  }[];
};

export type MoneyGoal = {
  name: string;
  amount: number;
  currentBalance: number;
};

export type MoneyBudget = {
  name: string;
  amount: number;
  spentAmount: number;
};
