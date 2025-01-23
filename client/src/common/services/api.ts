import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BACKEND_BASE_URL } from "../constants";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${BACKEND_BASE_URL}/api`,
});
