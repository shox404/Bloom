import { Product } from "@/app/types";
import { api } from "../api";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
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
  useGetProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;

export const { createProduct, getProducts, editProduct, deleteProduct } =
  productsApi.endpoints;
