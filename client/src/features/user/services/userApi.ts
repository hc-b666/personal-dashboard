import { baseApi } from "@/common/services/api";
import { ServerResponse } from "@/common/types";

interface FindUserResponse {
  firstName: string | null;
  lastName: string | null;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UpdateInfoRequest {
  firstname: string;
  lastname: string;
  logo: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    findUser: build.query<FindUserResponse, {}>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateInfo: build.mutation<ServerResponse, UpdateInfoRequest>({
      query: (body) => ({
        url: "/user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useFindUserQuery, useUpdateInfoMutation } = userApi;
