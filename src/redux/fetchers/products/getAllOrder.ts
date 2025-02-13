import { baseApi } from "../../api/baseApi";

const getAllOrder = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => ({
        url: "/create-order/getAllOrder",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOrderQuery } = getAllOrder;
