import { normalizeUrl } from "@/lib/utils";

const apiBaseUrl = normalizeUrl(import.meta.env.VITE_API_BASE_URL);
const overviewUrl = apiBaseUrl + "/overview-summary";

export const apiEndpoints = {
  auth: {
    googleLogin: apiBaseUrl + "/auth/google",
    logout: apiBaseUrl + "/auth/logout",
    authCheck: apiBaseUrl + "/auth/me",
  },
  wallet: apiBaseUrl + "/wallet",
  category: apiBaseUrl + "/category",
  transaction: apiBaseUrl + "/transaction",
  overview: {
    currentSummary: overviewUrl + "/current",
    topTransactions: overviewUrl + "/top-transactions",
    recentTransactions: overviewUrl + "/recent-transactions",
    dailyNetSnapshot: overviewUrl + "/daily-net-snapshot",
    topCategories: overviewUrl + "/top-categories",
  },
  trash: {
    transactions: apiBaseUrl + "/transaction/deleted",
  },
};
