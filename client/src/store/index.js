import { profileApi } from './services/profileService'
import { friendsApi } from './services/friendService'
import { searchApi } from './services/searchService'
import { postsApi } from './services/postService'
import { commentApi } from './services/commentService'
import chatSlice from './chatSlice'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {notificationApi} from "./services/notification.js";

export const store = configureStore({
  reducer: {
    chat: chatSlice,
    [profileApi.reducerPath]: profileApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      friendsApi.middleware,
      postsApi.middleware,
      commentApi.middleware,
      searchApi.middleware,
      notificationApi.middleware
    ),
})

setupListeners(store.dispatch)
