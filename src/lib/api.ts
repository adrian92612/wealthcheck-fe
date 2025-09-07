import { apiEndpoints } from "@/constants/apiEndpoints";
import { makeCrudApi } from "./apiClient";
import type { Wallet, WalletFormData } from "./types/wallet";
import type { Category, CategoryFormData } from "./types/category";
import type { Transaction, TransactionFormData } from "./types/transaction";

export const walletApi = makeCrudApi<Wallet, WalletFormData>(
  apiEndpoints.wallet
);

export const categoryApi = makeCrudApi<Category, CategoryFormData>(
  apiEndpoints.category
);

export const transactionApi = makeCrudApi<Transaction, TransactionFormData>(
  apiEndpoints.transaction
);
