import { createSlice } from '@reduxjs/toolkit'
import { fetchUserProfile } from '../actions/profile'

const initialState = {
  firstName: '',
  lastName: '',
  avatarUrl: '',
  phone: '',
  email: '',
  city: '',
  bannerUrl: '',
  bio: '',
  lastSeen: '',
  status: 'idle',
  friends: [],
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload)
        state.status = 'idle'
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

// export const {  } = profileSlice.actions

export default profileSlice.reducer