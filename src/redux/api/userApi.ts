import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getAllUser: build.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    userBlocked: build.mutation({
      query: (id) => ({
        url: `/user/blocked/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useGetAllUserQuery,
  useUserBlockedMutation,
} = userApi;
