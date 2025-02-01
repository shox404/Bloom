import { User } from "@/app/types";
import { api } from "../api";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserByPhone: build.query<User, string>({
      query: (body) => ({ url: "/users", method: "POST", body }),
    }),
    signUser: build.mutation<string, User>({
      query: (body) => ({ url: "/sign", method: "POST", body }),
    }),
  }),
});

export const { useGetUserByPhoneQuery, useSignUserMutation } = usersApi;

export const { getUserByPhone, signUser } = usersApi.endpoints;
