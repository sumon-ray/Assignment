import { baseApi } from "../../api/baseApi";

const changePassworduser = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (info) => ({
        url: "/createUser/changePassword",
        method: "PATCH",
        body: info,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = changePassworduser;
