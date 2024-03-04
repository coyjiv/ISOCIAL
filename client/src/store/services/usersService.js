import { createApi } from "@reduxjs/toolkit/query/react";
import { instance } from "../../api";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: async (args) => {
    try {
      const response = await instance(args);
      return { data: response.data };
    } catch (error) {
      return { error };
    }
  },
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page = 0, size = 10) => `users?page=${page}&size=${size}`,
      providesTags: (result, error) => [{ type: "Users" }],
    }),
    getUserByName: builder.query({
      query: (name, page = 0, size = 10) => {
        return `users/search?name=${name}&page=${page}&size=${size}`;
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByNameQuery } = usersApi;
