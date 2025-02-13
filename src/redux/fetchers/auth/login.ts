import { baseApi } from "../../api/baseApi";

const loginUser = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (info) => ({
        url: "/login",
        method: "POST",
        body: info,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginUser;
