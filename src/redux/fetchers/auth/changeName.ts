import { baseApi } from "../../api/baseApi";

const changeName = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeName: builder.mutation({
      query: (info) => {
        return {
          url: "/createUser/changeName",
          method: "POST",
          body: info,
        };
      },
    }),
  }),
});

export const { useChangeNameMutation } = changeName;
