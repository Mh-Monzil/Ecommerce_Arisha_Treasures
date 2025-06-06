import { commonApi } from "./api";

export const categoryApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "/category",
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
