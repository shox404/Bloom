import { User } from "@/app/types";
import { api } from "../api";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<string, User[]>({
      query: () => ({ url: "/products", method: "GET" }),
    }),
    getProduct: build.query<User, string>({
      query: (id) => ({ url: `/products/${id}`, method: "GET" }),
    }),
    deleteProduct: build.mutation<string, User>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetProductQuery,
} = productsApi;

export const { getProduct } = productsApi.endpoints;
