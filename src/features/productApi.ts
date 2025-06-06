import { commonApi } from "./api";

const productApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products/create",
        method: "POST",
        body: newProduct,
      }),
    }),
    getAllProducts: builder.query({
      query: () => "/products",
    }),
  }),
});

export const { useCreateProductMutation, useGetAllProductsQuery } = productApi;
