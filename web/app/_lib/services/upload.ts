import { IncomingMessage } from "@/app//types";
import { api } from "../api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getImage: builder.query<IncomingMessage, string>({
      query: (id) => ({ url: `/upload?id=${id}`, method: "GET" }),
    }),
    upload: builder.mutation<IncomingMessage, FormData>({
      query: (body) => ({ url: "/upload", method: "POST", body }),
    }),
    delete: builder.mutation<IncomingMessage, string>({
      query: (id) => ({ url: `/upload?id=${id}`, method: "DELETE" }),
    }),
  }),
});

export const { useGetImageQuery, useUploadMutation, useDeleteMutation } = adminApi;

export const {} = adminApi.endpoints;
