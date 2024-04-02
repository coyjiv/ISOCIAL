import { createApi } from '@reduxjs/toolkit/query/react'
import { instance } from '../../api/index.js'

export const searchApi = createApi({
  reducerPath: "searchApi",
  tagTypes: ["Search"],
  baseQuery: async (args) => {
    try {
      const response = await instance(args)
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  },
  endpoints: (builder) => ({
    getUserByName: builder.query({
      query: ({ name, page = 0, size = 10 }) => {
        return `users/search?name=${name}&page=${page}&size=${size}`
      },
      providesTags: () => [{ type: 'Search' }],
      keepUnusedDataFor: 0,
    }),
  }),
})

export const { useGetUserByNameQuery } = searchApi
