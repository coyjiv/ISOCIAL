import { createApi } from '@reduxjs/toolkit/query/react'
import { instance } from '../../api/config'

export const friendsApi = createApi({
  reducerPath: 'friendsApi',
  baseQuery: async (args) => {
    try {
      const response = await instance(args)
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  },
  tagTypes: ['Friends'],
  endpoints: (builder) => ({
    getFriendsList: builder.query({
      query: (id) => `friends/${id}`,
      providesTags: (id) => [{ type: 'Friends', id }],
    }),
    sendFriendRequest: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends/add`,
          method: 'POST',
          data: { userId },
        }
      },
      invalidatesTags: [{ type: 'Friends' }],
    }),
    removeFriend: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends/remove`,
          method: 'DELETE',
          data: { userId },
        }
      },
      invalidatesTags: [{ type: 'Friends' }],
    }),
  }),
})

export const {
  useGetFriendsListQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} = friendsApi
