import { normalizeUrl } from "@/lib/utils";

const baseUrl = normalizeUrl(import.meta.env.BASE_URL);
const dashboard = baseUrl + "/dashboard";

export const appRoute = {
  home: baseUrl,
  overview: dashboard + "/overview",
  transactions: dashboard + "/transaction",
  wallet: dashboard + "/wallet",
  category: dashboard + "/category",
  goals: dashboard + "/goals",
};
