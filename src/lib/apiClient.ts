import { appRoute } from "@/constants/appRoutes";
import { toQueryString } from "./utils";

export type ApiResponse<T> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
  timestamp: string;
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const res = await fetch(endpoint, {
    ...options,
    credentials: "include",
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    window.location.href = appRoute.home;
  }

  return res.json() as Promise<ApiResponse<T>>;
}

export const makeCrudApi = <T, TForm = Partial<T>, TList = T[]>(
  base: string
) => ({
  fetchAll: (params?: Record<string, unknown>) => {
    const qs = params ? `?${toQueryString(params)}` : "";
    return apiFetch<TList>(`${base}${qs}`);
  },
  fetchById: (id: number | string) => apiFetch<T>(`${base}/${id}`),
  create: (data: TForm) =>
    apiFetch<T>(base, { method: "POST", body: JSON.stringify(data) }),
  update: (id: number | string, data: TForm) =>
    apiFetch<T>(`${base}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number | string) =>
    apiFetch<T>(`${base}/${id}`, { method: "DELETE" }),
});
