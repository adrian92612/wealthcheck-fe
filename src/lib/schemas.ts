import { z } from "zod";

export const walletSchema = z.object({
  name: z.string().trim().min(1, { error: "Must be at least 1 character" }),
  balance: z.number().int().gt(0, "Balance must be greater than 0"),
});

export const categorySchema = z.object({
  name: z.string().trim().min(1, { error: "Must be at least 1 character" }),
  description: z.string().optional(),
  type: z.enum(["INCOME", "EXPENSE"], { error: "Must be Income/Expense" }),
  icon: z.string().trim().min(1, { error: "Icon is required" }),
});
