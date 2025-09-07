import type z from "zod";
import type { categorySchema } from "../schemas";

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
