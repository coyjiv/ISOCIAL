import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getProfileById: builder.query({
      query: (id) => `users/${id}`,
    }),
    
  }),
})


export const { useGetProfileByIdQuery } = profileApi