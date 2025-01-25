import { baseApi } from "@/common/services/api";
import { ProjectType } from "../types";

export const projectTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    findAllProjectTypes: build.query<ProjectType[], {}>({
      query: () => ({
        url: "/project-types",
        method: "GET",
      }),
    }),
  }),
});

export const { useFindAllProjectTypesQuery } = projectTypeApi;
