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
  const res = await fetch(endpoint, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  return res.json() as Promise<ApiResponse<T>>;
}
