// import { friendsApi } from './services/friendService'
import { profileApi } from './services/profileService'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    // [friendsApi.reducerPath]: friendsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
})

setupListeners(store.dispatch)
