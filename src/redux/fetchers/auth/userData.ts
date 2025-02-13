import { baseApi } from "../../api/baseApi";

const userData = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    singalUser: builder.query({
      query: (email) => ({
        url: `/createUser/singalUser/${email}`,
      }),
    }),
  }),
});

export const { useSingalUserQuery } = userData;
