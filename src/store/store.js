import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./eventsSlice";
import typesSlice from "./typesSlice";
import eventSlice from "./eventSlice";

export const store = configureStore({
  reducer: {
    events: eventsSlice,
    event: eventSlice,
    types: typesSlice,
  },
  devTools: true,
});
