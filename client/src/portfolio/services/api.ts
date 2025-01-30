import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_BASE_URL } from "@/common/constants";
import { UserInfo } from "../types";
import { AboutContent } from "@/features/about-me/types";
import { Project } from "@/features/projects/types";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}/api`,
  }),
  endpoints: (build) => ({
    getUserInfo: build.query<UserInfo, string | undefined>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),
    getAbout: build.query<AboutContent, string | undefined>({
      query: (userId) => ({
        url: `/about/${userId}`,
        method: "GET",
      }),
    }),
    getProjects: build.query<Project[], string | undefined>({
      query: (userId) => ({
        url: `/projects/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserInfoQuery, useGetAboutQuery, useGetProjectsQuery } =
  portfolioApi;
