import { configureStore } from "@reduxjs/toolkit";

import eventsSlice from "../Components/Event/eventsSlice";
import eventSlice from "../Components/Event/eventSlice";
import authSlice from "../Components/Auth/authSlice";

import typesSlice from "./typesSlice";
import userSlice from "../Components/Profile/userSlice";
import favoriteSlice from "../Components/Favorites/favoriteSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    events: eventsSlice,
    event: eventSlice,
    types: typesSlice,
    auth: authSlice,
    fav: favoriteSlice,
  },
  devTools: true,
});
