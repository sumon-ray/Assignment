import { baseApi } from "../../api/baseApi";

export const getAllProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: "/products/allProduct",
      }),
    }),
  }),
});

export const { useGetAllProductQuery } = getAllProduct;
