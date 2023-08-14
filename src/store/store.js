import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./eventsSlice";
import typesSlice from "./typesSlice";

export const store = configureStore({
  reducer: {
    events: eventsSlice,
    types: typesSlice,
  },
  devTools: true,
});
