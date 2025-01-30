import { User } from "@/app/types";
import { api } from "../api";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query: () => ({ url: "/users", method: "GET" }),
    }),
    signUser: build.mutation<string, User>({
      query: (body) => ({ url: "/sign", method: "POST", body }),
    }),
  }),
});

export const { useGetUserQuery, useSignUserMutation } = usersApi;

export const { getUser, signUser } = usersApi.endpoints;
