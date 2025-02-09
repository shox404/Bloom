import { IncomingImageMessage, IncomingMessage } from "@/app/global/types";
import { api } from "../api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    get: builder.query<IncomingImageMessage, string>({
      query: (id) => ({ url: `/upload/${id}`, method: "GET" }),
    }),
    upload: builder.mutation<IncomingImageMessage, FormData>({
      query: (body) => ({ url: "/upload", method: "POST", body }),
    }),
    delete: builder.mutation<IncomingMessage, string>({
      query: (id) => ({ url: `/upload/${id}`, method: "DELETE" }),
    }),
  }),
});

export const { useGetQuery, useUploadMutation, useDeleteMutation } = adminApi;

export const {} = adminApi.endpoints;
