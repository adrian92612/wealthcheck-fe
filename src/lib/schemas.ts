import { z } from "zod";
import { transactionTypes, categoryTypes } from "./types";

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

const baseSchema = z.object({
  type: z.enum(transactionTypes, { error: "Must be INCOME/EXPENSE/TRANSFER" }),
  title: z.string().trim().min(1, { error: "Must be at least 1 character" }),
  notes: z.string().trim().optional(),
  amount: z
    .number({ error: "Amount is required" })
    .gt(0, { error: "Must be greater than 0" }),
  transactionDate: z.date({ error: "Transaction date is required" }),
});

export const transactionSchema = z
  .discriminatedUnion("type", [
    baseSchema.extend({
      type: z.literal("INCOME"),
      categoryId: z.number({ error: "Category is required" }),
      toWalletId: z.number({ error: "Wallet is required" }).optional(),
    }),
    baseSchema.extend({
      type: z.literal("EXPENSE"),
      categoryId: z.number({ error: "Category is required" }),
      fromWalletId: z.number({ error: "Wallet is required" }).optional(),
    }),
    baseSchema.extend({
      type: z.literal("TRANSFER"),
      fromWalletId: z.number({ error: "Source wallet is required" }).optional(),
      toWalletId: z
        .number({ error: "Destination wallet is required" })
        .optional(),
    }),
  ])
  .refine(
    (data) => {
      if (data.type === "TRANSFER") {
        return (
          data.fromWalletId !== undefined &&
          data.toWalletId !== undefined &&
          data.fromWalletId !== data.toWalletId
        );
      }
      return true;
    },
    {
      message: "From Wallet and To Wallet must be different",
      path: ["toWalletId"],
    }
  );
