import { createSlice } from '@reduxjs/toolkit'
import { paginationDto } from './posts'
import {
  getPersonalFriends,
  getFriendsList,
  sendFriendRequest,
  removeFriend,
  acceptFriendRequest,
  declineFriendRequest,
  // subscribersCount,
  // cancelFriendRequest,
  availableFriendRequests,
} from '../actions/friends'

export const friendSlice = createSlice({
  name: 'friends',
  initialState: {
    personalFriends: paginationDto,
    friends: paginationDto,
    friendRequests: paginationDto,
    friendRecommendations: paginationDto,
    mutationError: '',
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPersonalFriends.fulfilled, (state, action) => {
        if (state.personalFriends.content.length > 0) {
          state.personalFriends.content = state.personalFriends.content.concat(
            action.payload.content
          )
        } else {
          state.personalFriends = action.payload
        }
        state.personalFriends.isLoading = false
        state.personalFriends.error = ''
      })
      .addCase(getPersonalFriends.pending, (state) => {
        state.personalFriends.isLoading = true
      })
      .addCase(getPersonalFriends.rejected, (state, action) => {
        state.personalFriends.isLoading = false
        state.personalFriends.error = action.error.message
      })
      .addCase(getFriendsList.fulfilled, (state, action) => {
        if (state.friends.content.length > 0) {
          state.friends.content = state.friends.content.concat(
            action.payload.content
          )
        } else {
          state.friends = action.payload
        }
        state.friends.isLoading = false
        state.friends.error = ''
      })
      .addCase(getFriendsList.pending, (state) => {
        state.friends.isLoading = true
      })
      .addCase(getFriendsList.rejected, (state, action) => {
        state.friends.isLoading = false
        state.friends.error = action.error.message
      })
      .addCase(sendFriendRequest.fulfilled, (state) => {
        state.mutationError = ''
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.mutationError = action.error.message
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        const { userId } = action.payload
        state.personalFriends.content = state.personalFriends.content.filter(
          (friend) => friend.id !== userId
        )
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.mutationError = action.error.message
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        const { userId, user } = action.payload
        state.friendRequests.content = state.friendRequests.content.filter(
          (friend) => friend.id !== userId
        )

        state.personalFriends.content = [user, ...state.personalFriends.content]
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.mutationError = action.error.message
      })
      .addCase(declineFriendRequest.fulfilled, (state, action) => {
        const { userId } = action.payload
        state.friendRequests.content = state.friendRequests.content.filter(
          (friend) => friend.id !== userId
        )
      })
      .addCase(declineFriendRequest.rejected, (state, action) => {
        state.mutationError = action.error.message
      })
      .addCase(availableFriendRequests.fulfilled, (state, action) => {
        if (state.friendRequests.content.length > 0) {
          state.friendRequests.content = state.friendRequests.content.concat(
            action.payload.content
          )
        } else {
          state.friendRequests = action.payload
        }
        state.friendRequests.isLoading = false
        state.friendRequests.error = ''
      })
      .addCase(availableFriendRequests.pending, (state) => {
        state.friendRequests.isLoading = true
      })
      .addCase(availableFriendRequests.rejected, (state, action) => {
        state.friendRequests.isLoading = false
        state.friendRequests.error = action.error.message
      }),
})

// export const {
//   setChats,
//   setMessages,
//   addMessage,
//   removeMessage,
// } = friendSlice.actions
