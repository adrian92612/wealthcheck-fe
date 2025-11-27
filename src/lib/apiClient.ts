import { appRoute } from "@/constants/appRoutes";

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
