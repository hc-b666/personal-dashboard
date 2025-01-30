import { baseApi } from "@/common/services/api";
import { AboutContent } from "../types";
import { ServerResponse } from "@/common/types";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    findByUserId: build.query<AboutContent, number>({
      query: (userId) => ({
        url: `/about/${userId}`,
        method: "GET",
      }),
      providesTags: ["AboutContent"],
    }),
    updateAboutContent: build.mutation<ServerResponse, { content: string }>({
      query: (body) => ({
        url: `/about`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AboutContent"],
    }),
  }),
});

export const { useFindByUserIdQuery, useUpdateAboutContentMutation } = aboutApi;
