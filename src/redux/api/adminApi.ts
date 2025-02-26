import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdmin: build.query({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    getAllRechargeRequest: build.query({
      query: () => ({
        url: `/admin/recharge-request`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    approvedRechargeRequest: build.mutation({
      query: (id) => ({
        url: `/admin/approve-balance-recharge/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAdminQuery,
  useGetAllRechargeRequestQuery,
  useApprovedRechargeRequestMutation,
} = adminApi;
