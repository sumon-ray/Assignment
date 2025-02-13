import { baseApi } from "../../api/baseApi";

const deleteProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useDeleteProductMutation } = deleteProduct;
