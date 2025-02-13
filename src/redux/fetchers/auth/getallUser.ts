import { baseApi } from "../../api/baseApi";

const getAllUser = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/createUser/getAllUser",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUserQuery } = getAllUser;
