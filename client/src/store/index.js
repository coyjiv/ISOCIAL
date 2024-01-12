import { configureStore } from '@reduxjs/toolkit'
import users from './slices/users'

export const store = configureStore({
  reducer: {
    users,
  },
})