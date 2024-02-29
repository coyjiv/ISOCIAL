import { configureStore } from '@reduxjs/toolkit'
import users from './slices/users'
import profile from './slices/profile'

export const store = configureStore({
  reducer: {
    users,
    profile
  },
})