import { profileApi } from './services/profileService'
import { friendsApi } from './services/friendService'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { postsApi } from './services/postService'
import { commentApi } from './services/commentService'

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      friendsApi.middleware,
      postsApi.middleware,
      commentApi.middleware
    ),
})

setupListeners(store.dispatch)
