const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const auth = apiBaseUrl + "auth";
const wallet = apiBaseUrl + "wallet";
const category = apiBaseUrl + "category";

export const apiEndpoints = {
  auth: {
    googleLogin: auth + "/google",
    logout: auth + "/logout",
    authCheck: auth + "/me",
  },
  wallet: {
    base: wallet,
    byId: (id: number) => `${wallet}/${id}`,
  },
  category: {
    base: category,
    byId: (id: number) => `${category}/${id}`,
  },
};
