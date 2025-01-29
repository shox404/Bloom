import { User } from "@/app/types";
import { api } from "../api";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.mutation<User, string>({
      query: (body) => ({ url: "/users", method: "POST", body }),
    }),
    verifyUser: build.mutation<string, User>({
      query: (body) => ({ url: "/verify", method: "POST", body }),
    }),
  }),
});

export const { useGetUserMutation, useVerifyUserMutation } = usersApi;

export const { getUser, verifyUser } = usersApi.endpoints;
