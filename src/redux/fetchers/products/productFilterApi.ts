import { baseApi } from "../../api/baseApi";
type TAssingPerm = {
  name: string;
  value: string | number | boolean;
};
const getProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFilterProduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TAssingPerm) => {
            if (item.value !== false) {
              params.append(`${item.name}`, `${item.value}`);
            }
          });
        }
        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useGetAllFilterProductQuery } = getProduct;
