import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const fatchQuery = fetchBaseQuery({
  baseUrl: "https://cycle-store-server-gray.vercel.app/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fatchQuery,
  endpoints: () => ({}),
});
