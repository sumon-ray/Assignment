import { baseApi } from "../../api/baseApi";

const getSingalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingalProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSingalProductQuery } = getSingalApi;
