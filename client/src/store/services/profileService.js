import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getProfileById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Profile', id }],
    }),
    updateProfile: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `users/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Profile', id }],
    }),
  }),
})

export const { useGetProfileByIdQuery, useUpdateProfileMutation } = profileApi
