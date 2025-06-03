import { commonApi } from "./api";

export const categoryApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategoriesFromCategory: builder.query({
      query: () => "/category",
    }),
  }),
});

export const { useGetAllCategoriesFromCategoryQuery } = categoryApi;
