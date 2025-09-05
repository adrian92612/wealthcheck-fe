const baseUrl = import.meta.env.BASE_URL;
const dashboard = baseUrl + "dashboard/";

export const appRoute = {
  home: baseUrl,
  login: baseUrl + "login",
  overview: dashboard + "overview",
  transactions: dashboard + "transactions",
  income: dashboard + "income",
  expense: dashboard + "expense",
  transfer: dashboard + "transfer",
  goals: dashboard + "goals",
};
