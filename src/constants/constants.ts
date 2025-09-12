import {
  LucideHome,
  LucideCreditCard,
  LucideWallet,
  LucideTag,
} from "lucide-react";
import type { Menu } from "@/lib/types";
import { appRoute } from "@/constants/appRoutes";

export const noTransactionsExistMessages = [
  "All quiet here… your money is behaving.",
  "Your ledger is spotless. Keep it up!",
  "Nothing to see… your wallets are lonely.",
];

export const noTransactionsForFilterMessages = [
  "No transactions match your filter. Try adjusting it.",
  "Zero results… maybe broaden your search?",
  "Your filter is strict! No transactions found.",
];

export const menu: Menu[] = [
  { label: "Overview", link: appRoute.overview, icon: LucideHome },
  {
    label: "Transactions",
    link: appRoute.transactions,
    icon: LucideCreditCard,
  },
  { label: "Wallet", link: appRoute.wallet, icon: LucideWallet },
  { label: "Category", link: appRoute.category, icon: LucideTag },
  // { label: "Goals", link: appRoute.goals, icon: LucideTarget },
];
