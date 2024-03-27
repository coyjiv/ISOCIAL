import { profileApi } from './profileService'

export const friendsApi = profileApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsList: builder.query({
      query: ({ id, page = 0, size = 10 }) =>
        `friends/${id}?page=${page}&size=${size}`,
      providesTags: (id) => [
        { type: 'Friends', id },
        { type: 'Profile', id },
      ],
    }),
    sendFriendRequest: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends?addresserId=${userId}`,
          method: 'POST',
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: 'Friends', id: userId },
        { type: 'Profile', id: userId },
      ],
    }),
    removeFriend: builder.mutation({
      query: ({ friendUserId }) => {
        return {
          url: `friends?friendUserId=${friendUserId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: 'Friends', id: userId },
        { type: 'Profile', id: userId },
      ],
    }),
    acceptFriendRequest: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends/accept?friendId=${userId}`,
          method: 'POST',
        }
      },
      invalidatesTags: () => [{ type: 'Friends' }, { type: 'Profile' }],
    }),
    declineFriendRequest: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends/decline?friendId=${userId}`,
          method: 'POST',
        }
      },
      invalidatesTags: () => [{ type: 'Friends' }, { type: 'Profile' }],
    }),
    subscribersCount: builder.query({
      query: (id) => `friends/subscribersCount/${id}`,
      providesTags: (id) => [
        { type: 'Friends', id },
        { type: 'Profile', id },
      ],
    }),
    cancelFriendRequest: builder.mutation({
      query: ({ userId }) => {
        return {
          url: `friends/decline?friendId=${userId}`,
          method: 'POST',
          data: { userId },
        }
      },
      invalidatesTags: (result, error, { userId }) => [
        { type: 'Friends', id: userId },
        { type: 'Profile', id: userId },
      ],
    }),
    availableFriendRequests: builder.query({
      query: (page) => `friends/availableFriendRequests?page=${page}&size=10`,
      providesTags: () => [{ type: 'Friends' }, { type: 'Profile' }],
      keepUnusedDataFor: 0,
    }),
    getRecommendations: builder.query({
      query: (page) => `friends/recommendations?page=${page}&size=10`,
      providesTags: () => [{ type: 'Friends' }, { type: 'Profile' }],
      keepUnusedDataFor: 0,
    }),
    getUpcomingBirthdays: builder.query({
      query: ({ userId, page = 0 }) =>
        `friends/birthdays/${userId}?page=${page}&size=10`,
      providesTags: () => [{ type: 'Friends' }, { type: 'Profile' }],
    }),
    getFriendsWithSameBirthPlace: builder.query({
      query: ({ userId, page = 0 }) =>
        `friends/birthplace/${userId}?page=${page}&size=10`,
      providesTags: () => [{ type: 'Friends' }, { type: 'Profile' }],
    }),
    getFriendsWithSameEducation: builder.query({
      query: ({ userId, page = 0 }) =>
        `friends/education/${userId}?page=${page}&size=10`,
      providesTags: () => [{ type: 'Friends' }, { type: 'Profile' }],
    }),
    getFriendsWithSameLocation: builder.query({
      query: ({ userId, page = 0 }) =>
        `friends/location/${userId}?page=${page}&size=10`,
      providesTags: () => [{ type: 'Friends' }, { type: 'Profile' }],
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
  useCancelFriendRequestMutation,
  useAvailableFriendRequestsQuery,
  useGetRecommendationsQuery,
  useGetUpcomingBirthdaysQuery,
  useGetFriendsWithSameBirthPlaceQuery,
  useGetFriendsWithSameEducationQuery,
  useGetFriendsWithSameLocationQuery,
} = friendsApi
