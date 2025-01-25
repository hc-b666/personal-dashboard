import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BACKEND_BASE_URL } from "../constants";
import { RootState } from "@/app/store";
import { logout, setAccessToken } from "@/features/auth/slices/authSlice";
import { toast } from "../hooks/use-toast";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${BACKEND_BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const handleLogout = (api: BaseQueryApi, message: string) => {
  api.dispatch(logout());
  toast({ description: message });
  window.location.href = "/auth/login";
};

export const baseQueryInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      toast({ description: "Your are not logged in. Please login." });
      return result;
    }

    try {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as { accessToken: string })
          .accessToken;
        api.dispatch(setAccessToken(newAccessToken));
        result = await baseQuery(args, api, extraOptions);
      } else {
        handleLogout(api, "Your session has expired. Please log in again.");
      }
    } catch (err) {
      handleLogout(api, "Your session has expired. Please log in again.");
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryInterceptor,
  tagTypes: ["User", "Project"],
  endpoints: () => ({}),
});
