import { baseApi } from "@/common/services/api";
import { ServerResponse } from "@/common/types/api.types";

interface FindUserResponse {
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UpdateInfoRequest {
  firstname: string;
  lastname: string;
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
