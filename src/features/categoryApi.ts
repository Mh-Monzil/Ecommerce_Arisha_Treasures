import { commonApi } from "./api";

export const categoryApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/category/create",
        method: "POST",
        body: newCategory,
      }),
    }),
    getAllCategories: builder.query({
      query: () => "/category",
    }),
  }),
});

export const { useCreateCategoryMutation, useGetAllCategoriesQuery } =
  categoryApi;
