import { baseApi } from "../../api/baseApi";

const getOrder = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (email) => ({
        url: `/create-order/getOrder/${email}`,
      }),
    }),
  }),
});

export const { useGetOrderQuery } = getOrder;
