import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTransaction: build.query({
      query: () => ({
        url: `/transition`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
    getUserTransaction: build.query({
      query: (id) => ({
        url: `/transition/user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
    getAgentTransaction: build.query({
      query: (id) => ({
        url: `/transition/agent/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),
    cashIn: build.mutation({
      query: (data) => ({
        url: "/transition/cash-in",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
    sendMoney: build.mutation({
      query: (data) => ({
        url: "/transition/send-money",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
    cashOut: build.mutation({
      query: (data) => ({
        url: "/transition/cash-out",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
    addMoney: build.mutation({
      query: (data) => ({
        url: "/transition/add-money",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
  }),
});

export const {
  useGetUserTransactionQuery,
  useCashInMutation,
  useSendMoneyMutation,
  useCashOutMutation,
  useGetAgentTransactionQuery,
  useAddMoneyMutation,
  useGetAllTransactionQuery
} = transactionApi;
