import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./eventsSlice";
import typesSlice from "./typesSlice";
import eventSlice from "./eventSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    events: eventsSlice,
    event: eventSlice,
    types: typesSlice,
    auth: authSlice,
  },
  devTools: true,
});
