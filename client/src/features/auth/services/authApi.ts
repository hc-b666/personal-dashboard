import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/common/services/api";
import { ServerResponse } from "@/common/types";
import { LoginDto, RegisterDto, User } from "../types";

interface LoginResponse extends ServerResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (build) => ({
    register: build.mutation<ServerResponse, RegisterDto>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: build.mutation<LoginResponse, LoginDto>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
