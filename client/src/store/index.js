import { profileApi } from './services/profileService'
import { friendsApi } from './services/friendService'
import { usersApi } from './services/usersService'
import { searchApi } from './services/searchService'
import { postsApi } from './services/postService'
import { commentApi } from './services/commentService'
import { chatSlice as chatReducer } from './chatSlice'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {notificationApi} from "./services/notification.js";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      friendsApi.middleware,
      postsApi.middleware,
      commentApi.middleware,
      usersApi.middleware,
      searchApi.middleware,
      notificationApi.middleware
    ),
})

setupListeners(store.dispatch)
