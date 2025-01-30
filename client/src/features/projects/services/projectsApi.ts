import { baseApi } from "@/common/services/api";
import { ServerResponse } from "@/common/types";
import { CreateProjectRequest, Project } from "../types";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    findAllProjects: build.query<Project[], {}>({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    createProject: build.mutation<ServerResponse, CreateProjectRequest>({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useFindAllProjectsQuery, useCreateProjectMutation } =
  projectsApi;
