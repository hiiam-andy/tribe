import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getEvent = createAsyncThunk(
  "event/getEvent",
  async (id, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/events/${id}`);
      return res;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const eventsSlice = createSlice({
  name: "event",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getEvent.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default eventsSlice.reducer;
