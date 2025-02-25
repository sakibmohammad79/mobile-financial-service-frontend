import { createApi } from "@reduxjs/toolkit/query/react";

import { tagTypesList } from "../tagTypes";
import { axiosBaseQuery } from "../../helper/axios/axiosBaseQuery";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    // baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}`,
    baseUrl: "http://localhost:5000/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
