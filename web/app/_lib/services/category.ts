import { Category } from "@/app/types";
import { api } from "../api";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<Category[], void>({
      query: () => ({ url: "/category", method: "GET" }),
    }),
    createCategory: build.mutation<Category, Category>({
      query: (body) => ({ url: "/category", method: "POST", body }),
    }),
    editCategory: build.mutation<Category, Category>({
      query: (body) => ({
        url: `/category?id=${body.id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteCategory: build.mutation<{ id: string }, string>({
      query: (data) => ({
        url: `/category?id=${data}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export const { createCategory, getCategory, editCategory, deleteCategory } =
  categoryApi.endpoints;
