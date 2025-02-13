import { baseApi } from "../../api/baseApi";

export const createOrder = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payInfo) => ({
        url: "create-order",
        method: "POST",
        body: payInfo,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = createOrder;
