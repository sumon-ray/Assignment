import { baseApi } from "../../api/baseApi";

const createProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = createProduct;
