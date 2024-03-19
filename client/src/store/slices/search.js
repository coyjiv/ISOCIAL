import { createSlice } from '@reduxjs/toolkit'
import { searchUser } from '../actions/users'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    users: [],
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchUser.fulfilled, (state, action) => {
      state.users = action.payload
    })
  },
})

export const { setSearchValue } = searchSlice.actions
