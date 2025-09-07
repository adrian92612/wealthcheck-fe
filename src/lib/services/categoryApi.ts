import { apiEndpoints } from "@/constants/apiEndpoints";
import { apiFetch } from "@/lib/apiClient";
import type { Category, CategoryFormData } from "@/lib/types/category";

export const fetchCategories = () =>
  apiFetch<Category[]>(apiEndpoints.category.base);

export const createCategory = (data: CategoryFormData) =>
  apiFetch<Category>(apiEndpoints.category.base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const updateCategory = (data: CategoryFormData, id: number) =>
  apiFetch<Category>(apiEndpoints.category.byId(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const deleteCategory = (id: number) =>
  apiFetch<Category>(apiEndpoints.category.byId(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
