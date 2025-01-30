import { User } from "@/app/types";
import { api } from "../api";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserByPhone: build.query<User, string>({
      query: (data) => ({ url: `/users/${data}`, method: "GET" }),
    }),
    signUser: build.mutation<string, User>({
      query: (body) => ({ url: "/sign", method: "POST", body }),
    }),
  }),
});

export const { useGetUserByPhoneQuery, useSignUserMutation } = usersApi;

export const { getUserByPhone, signUser } = usersApi.endpoints;
