import type z from "zod";
import type { transactionSchema } from "../schemas";

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
