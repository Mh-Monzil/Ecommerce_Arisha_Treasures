import { commonApi } from "./api";

const reviewApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewByProductId: builder.query({
      query: (productId) => ({
        url: `/reviews/${productId}`,
      }),
    }),
  }),
});

export const { useGetReviewByProductIdQuery } = reviewApi;
