import { User } from "@/app/types";
import { api } from "../api";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (body) => ({ url: "/users", method: "POST", body }),
    }),
  }),
});

export const { useGetUserQuery } = usersApi;

export const { getUser } = usersApi.endpoints;
