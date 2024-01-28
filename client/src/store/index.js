import { configureStore } from '@reduxjs/toolkit'
import { profileApi } from './services/profileService'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileApi.middleware),
})

setupListeners(store.dispatch)