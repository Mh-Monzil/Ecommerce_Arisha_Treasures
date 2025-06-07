import { commonApi } from "./api";

const orderApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/orders/create",
        method: "POST",
        body: newOrder,
      }),
    }),
    getAllOrders: builder.query({
      query: () => "/orders",
    }),
  }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery } = orderApi;
