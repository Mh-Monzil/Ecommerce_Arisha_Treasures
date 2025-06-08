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
    getSingleOrder: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} = orderApi;
