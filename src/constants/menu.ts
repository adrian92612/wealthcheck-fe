import {
  LucideHome,
  LucideCreditCard,
  LucideWallet,
  LucideTag,
} from "lucide-react";
import type { Menu } from "@/lib/types";
import { appRoute } from "@/constants/appRoutes";

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
