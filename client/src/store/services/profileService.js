import { createApi } from '@reduxjs/toolkit/query/react'
import { instance } from '../../api/config'

export const profileApi = createApi({
	reducerPath: 'profileApi',
		// для автоматичної інвалідації кешу при роботі із типом "Profile"
		tagTypes: ["Profile"],
  baseQuery: async (args) => {
    try {
      const response = await instance(args)
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  },
  endpoints: (builder) => ({
    getProfileById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [
        { type: 'Profile', id },
        { type: 'Posts', id },
      ],
    }),
    updateProfile: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `users/${id}`,
          method: 'PATCH',
          data: body,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Profile', id }],
    }),
  }),
})

export const { useGetProfileByIdQuery, useUpdateProfileMutation } = profileApi
