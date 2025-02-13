import { Product } from "@/app/types";
import { api } from "../api";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<Product[], void>({
      query: () => ({ url: "/products", method: "GET" }),
    }),
    getProductByCategory: build.query<Product[], string | string[] | undefined>(
      {
        query: (category) => ({
          url: category ? `/products?category=${category}` : "/products",
          method: "GET",
        }),
      }
    ),
    createProduct: build.mutation<Product, Product>({
      query: (body) => ({ url: "/products", method: "POST", body }),
    }),
    editProduct: build.mutation<Product, Product>({
      query: (body) => ({ url: `/products/${body.id}`, method: "PUT", body }),
    }),
    deleteProduct: build.mutation<
      { id: string; image: string },
      { id: string; image: string }
    >({
      query: (data) => ({
        url: `/products?id=${data.id}`,
        method: "DELETE",
        body: data.image,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductByCategoryQuery,
  useGetProductQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;
export const {
  getProduct,
  getProductByCategory,
  createProduct,
  editProduct,
  deleteProduct,
} = productsApi.endpoints;
