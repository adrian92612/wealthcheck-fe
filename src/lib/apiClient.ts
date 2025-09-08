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

export const makeCrudApi = <T, TForm = Partial<T>>(base: string) => ({
  fetchAll: () => apiFetch<T[]>(base),
  fetchById: (id: number | string) => apiFetch<T>(`${base}/${id}`),
  create: (data: TForm) =>
    apiFetch<T>(base, { method: "POST", body: JSON.stringify(data) }),
  update: (id: number | string, data: TForm) =>
    apiFetch<T>(`${base}/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number | string) =>
    apiFetch<T>(`${base}/${id}`, { method: "DELETE" }),
});
