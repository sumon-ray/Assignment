import { baseApi } from "../../api/baseApi";

const updateProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProduct: builder.mutation({
      query: (info) => ({
        url: `/products/${info.id}`,
        method: "PUT",
        body: info,
      }),
    }),
  }),
});

export const { useUpdateProductMutation } = updateProduct;
