import type z from "zod";
import type { walletSchema } from "../schemas";

export type Wallet = {
  id: number | string;
  name: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

export type WalletFormData = z.infer<typeof walletSchema>;
