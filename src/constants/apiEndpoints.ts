import { normalizeUrl } from "@/lib/utils";

const apiBaseUrl = normalizeUrl(import.meta.env.VITE_API_BASE_URL);

export const apiEndpoints = {
  auth: {
    googleLogin: apiBaseUrl + "/auth/google",
    logout: apiBaseUrl + "/auth/logout",
    authCheck: apiBaseUrl + "/auth/me",
  },
  wallet: apiBaseUrl + "/wallet",
  category: apiBaseUrl + "/category",
  transaction: apiBaseUrl + "/transaction",
};
