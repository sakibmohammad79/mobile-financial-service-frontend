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
    getAllAgent: build.query({
      query: () => ({
        url: `/agent`,
        method: "GET",
      }),
      providesTags: [tagTypes.agent],
    }),
    sendBalanceRequest: build.mutation({
      query: (data) => ({
        url: `/agent/balance-recharge`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.agent],
    }),
    agentBlocked: build.mutation({
      query: (id) => ({
        url: `/agent/blocked/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.agent],
    }),
    agentUnBlocked: build.mutation({
      query: (id) => ({
        url: `/agent/unblocked/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.agent],
    }),
  }),
});

export const {
  useGetSingleAgentQuery,
  useSendBalanceRequestMutation,
  useGetAllAgentQuery,
  useAgentBlockedMutation,
  useAgentUnBlockedMutation,
} = agentApi;
