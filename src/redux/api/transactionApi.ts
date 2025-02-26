import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserTransaction: build.query({
      query: (id) => ({
        url: `/transition/user/${id}`,
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
  }),
});

export const { useGetUserTransactionQuery, useCashInMutation } = transactionApi;
