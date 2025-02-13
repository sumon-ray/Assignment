import { baseApi } from "../../api/baseApi";

const updateOrder = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrder: builder.mutation({
      query: (info) => ({
        url: "/create-order/changeStatus",
        method: "PUT",
        body: info,
      }),
    }),
  }),
});

export const { useUpdateOrderMutation } = updateOrder;
