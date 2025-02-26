import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const agentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleAgent: build.query({
      query: (id) => ({
        url: `/agent/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.agent],
    }),
  }),
});

export const { useGetSingleAgentQuery } = agentApi;
