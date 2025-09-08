import type z from "zod";
import type {
  categorySchema,
  transactionSchema,
  walletSchema,
} from "./schemas";

export type Category = {
  id: number | string;
  name: string;
  description: string;
  type: CategoryType;
  icon: string;
  createdAt: string;
  updatedAt: string;
};
export type CategoryFormData = z.infer<typeof categorySchema>;
export const categoryTypes = ["INCOME", "EXPENSE"] as const;
export type CategoryType = (typeof categoryTypes)[number];

export type Transaction = {
  id: number | string;
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
  createdAt: string;
  updatedAt: string;
};
export type TransactionFormData = z.infer<typeof transactionSchema>;
export const transactionTypes = ["INCOME", "EXPENSE", "TRANSFER"] as const;
export type TransactionType = (typeof transactionTypes)[number];

export type Wallet = {
  id: number | string;
  name: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};
export type WalletFormData = z.infer<typeof walletSchema>;
