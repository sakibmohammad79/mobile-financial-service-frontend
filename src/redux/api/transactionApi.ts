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
  }),
});

export const { useGetUserTransactionQuery } = transactionApi;
