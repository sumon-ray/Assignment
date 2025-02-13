import { baseApi } from "../../api/baseApi";

const changeUserStatus = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changeStaus: builder.mutation({
      query: (status) => ({
        url: "/createUser/changeStatus",
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const { useChangeStausMutation } = changeUserStatus;
