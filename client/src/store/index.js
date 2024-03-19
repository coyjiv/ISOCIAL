import { friendSlice as friendReducer } from './slices/friends'
import { chatSlice as chatReducer } from './slices/chats'
import { postSlice as postReducer } from './slices/posts'
import { profileSlice as profileReducer } from './slices/profile'
import { searchSlice as searchReducer } from './slices/search'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    friends: friendReducer,
    posts: postReducer,
    profile: profileReducer,
    search: searchReducer,
  },
})
