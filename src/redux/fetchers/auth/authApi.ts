import { baseApi } from "../../api/baseApi";

export const users = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.mutation({
      query: (users) => ({
        url: "/createUser",
        method: "POST",
        body: users,
      }),
    }),
  }),
});

export const { useUsersMutation } = users;
