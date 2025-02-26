import { createApi } from "@reduxjs/toolkit/query/react";

import { tagTypesList } from "../tagTypes";
import { axiosBaseQuery } from "../../helper/axios/axiosBaseQuery";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_API_URL}`,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
