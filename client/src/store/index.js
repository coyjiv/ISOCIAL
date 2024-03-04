import { profileApi } from "./services/profileService";
import { friendsApi } from "./services/friendService";
import { usersApi } from "./services/usersService";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      profileApi.middleware,
      friendsApi.middleware,
      usersApi.middleware,
    ),
});

setupListeners(store.dispatch);
