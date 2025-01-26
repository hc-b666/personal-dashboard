import { baseApi } from "@/common/services/api";
import { ProgrammingLanguage } from "../types";

export const languagesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    findAllLanguages: build.query<ProgrammingLanguage[], {}>({
      query: () => ({
        url: "/languages",
        method: "GET",
      }),
    }),
  }),
});

export const { useFindAllLanguagesQuery } = languagesApi;
