import { createSlice } from '@reduxjs/toolkit'
import {
  getProfileById,
  getPersonalProfile,
  updateProfile,
} from '../actions/users'

const profileDto = {
  id: localStorage.getItem('userId'),
  firstName: '',
  lastName: '',
  city: '',
  bio: '',
  lastSeen: '',
  gender: '',
  activityStatus: '',
  avatarsUrl: [],
  bannerUrl: '',
  friendsCount: 0,
  subscribersCount: 0,
  subscriptionsCount: 0,
  birthPlace: '',
  studyPlace: '',
  isLoading: false,
  error: '',
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {
      personal: profileDto,
      browsing: {
        ...profileDto,
        id: '',
        friendStatus: '',
      },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profile.browsing = action.payload
        state.profile.browsing.error = ''
        state.profile.browsing.isLoading = false
      })
      .addCase(getProfileById.pending, (state) => {
        state.profile.browsing.isLoading = true
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.profile.browsing.isLoading = false
        state.profile.browsing.error = action.error.message
      })
      .addCase(getPersonalProfile.fulfilled, (state, action) => {
        const modifiedProfile = { ...action.payload, isLoading: false }
        delete modifiedProfile.friendStatus
        state.profile.personal = modifiedProfile
        state.profile.personal.error = ''
      })
      .addCase(getPersonalProfile.pending, (state) => {
        state.profile.personal.isLoading = true
      })
      .addCase(getPersonalProfile.rejected, (state, action) => {
        state.profile.personal.isLoading = false
        state.profile.personal.error = action.error.message
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const modifiedProfile = { ...action.payload, isLoading: false }
        delete modifiedProfile.friendStatus
        state.profile.personal = modifiedProfile
        state.profile.personal.error = ''
      })
      .addCase(updateProfile.pending, (state) => {
        state.profile.personal.isLoading = true
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profile.personal.isLoading = false
        state.profile.personal.error = action.error.message
      })
  },
})

export const {
  setChats,
  setMessages,
  addMessage,
  removeMessage,
} = profileSlice.actions
