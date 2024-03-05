import { profileApi } from "./services/profileService";
import { friendsApi } from "./services/friendService";
import { usersApi } from "./services/usersService";
import { searchApi } from "./services/searchService";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      friendsApi.middleware,
      usersApi.middleware,
      searchApi.middleware,
    ),
});

setupListeners(store.dispatch);
