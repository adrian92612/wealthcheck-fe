import { z } from "zod";
import { categoryTypes } from "./types/category";
import { transactionTypes } from "./types/transaction";

export const walletSchema = z.object({
  name: z.string().trim().min(1, { error: "Must be at least 1 character" }),
  balance: z.number().gt(0, "Balance must be greater than 0"),
});

export const categorySchema = z.object({
  name: z.string().trim().min(1, { error: "Must be at least 1 character" }),
  description: z.string().optional(),
  type: z.enum(categoryTypes, { error: "Must be Income/Expense" }),
  icon: z.string().trim().min(1, { error: "Icon is required" }),
});

// Long fromWalletId,
// Long toWalletId,
// Long categoryId,

// @NotNull(message = "Title is required")
// String title,

// String notes,

// @Positive(message = "Amount must be greater than 0")
// BigDecimal amount,

// @NotNull(message = "Type is required")
// TransactionType type
export const transactionSchema = z.object({
  type: z.enum(transactionTypes, { error: "Must be INCOME/EXPENSE/TRANSFER" }),
  fromWalletId: z.number().optional(),
  toWalletId: z.number().optional(),
  categoryId: z.number().optional(),
  title: z.string().trim().min(1, { error: "Must be at least 1 character" }),
  notes: z.string().trim().optional(),
  amount: z.number().gt(0, { error: "Must be greater than 0" }),
});
