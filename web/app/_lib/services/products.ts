import { Product } from "@/app/types";
import { api } from "../api";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<Product[], void>({
      query: () => ({ url: "/products", method: "GET" }),
    }),
    createProduct: build.mutation<Product, Product>({
      query: (body) => ({ url: "/products", method: "POST", body }),
    }),
    editProduct: build.mutation<Product, Product>({
      query: (body) => ({ url: `/products/${body.id}`, method: "PUT", body }),
    }),
    deleteProduct: build.mutation<{ id: any }, { id: any }>({
      query: (data) => ({ url: `/products/${data.id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;
export const { getProduct, createProduct, editProduct, deleteProduct } =
  productsApi.endpoints;
