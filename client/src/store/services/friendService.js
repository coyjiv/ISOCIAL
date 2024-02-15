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
      query: (id, page, size) => `friends/${id}?page=${page}&size=${size}`,
      providesTags: (id) => [{ type: 'Friends', id }],
    }),
    sendFriendRequest: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends?addresserId=${userId}`,
          method: 'POST',
        }
      },
      invalidatesTags: [{ type: 'Friends' }],
    }),
    removeFriend: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends?friendId=${userId}`,
          method: 'DELETE',
          data: { userId },
        }
      },
      invalidatesTags: [{ type: 'Friends' }],
    }),
    acceptFriendRequest: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends/accept?friendId=${userId}`,
          method: 'POST',
        }
      },
      invalidatesTags: [{ type: 'Friends' }],
    }),
    declineFriendRequest: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends/decline?friendId=${userId}`,
          method: 'POST',
        }
      },
      invalidatesTags: [{ type: 'Friends' }],
    }),
    friendsCount: builder.query({
      query: (id) => `friends/friendsCount/${id}`,
      providesTags: (id) => [{ type: 'Friends', id }],
    }),
    subscribersCount: builder.query({
      query: (id) => `friends/subscribersCount/${id}`,
      providesTags: (id) => [{ type: 'Friends', id }],
    }),
    haveSentFriendRequest: builder.query({
      query: ({ currentUserId, id }) =>
        `friends/haveSentFriendRequest?currentUserId=${currentUserId}&userId=${id}`,
      providesTags: (result, error, { currentUserId, id }) => [
        { type: 'Friends', id: `${currentUserId}-${id}` },
      ],
    }),
    cancelFriendRequest: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends/cancelFriendRequest?friendId=${userId}`,
          method: 'POST',
          data: { userId },
        }
      },
      invalidatesTags: [{ type: 'Friends' }],
    }),
    availableFriendRequests: builder.query({
      query: (id) => `friends/availableFriendRequests?userId=${id}`,
      providesTags: (id) => [{ type: 'Friends', id }],
    }),
    isFriend: builder.query({
      query: ({ currentUserId, id }) =>
        `friends/isFriend?userId=${currentUserId}&friendId=${id}`,
      providesTags: (result, error, { currentUserId, id }) => [
        { type: 'Friends', id: `${currentUserId}-${id}` },
      ],
    }),
  }),
})

export const {
  useGetFriendsListQuery,
  useSendFriendRequestMutation,
  useRemoveFriendMutation,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useFriendsCountQuery,
  useSubscribersCountQuery,
  useHaveSentFriendRequestQuery,
  useCancelFriendRequestMutation,
  useAvailableFriendRequestsQuery,
  useIsFriendQuery,
} = friendsApi
