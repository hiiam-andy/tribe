import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
const token = localStorage.getItem("access_token");

export const getEvent = createAsyncThunk(
  "event/getEvent",
  async (id, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const eventSlice = createSlice({
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

export default eventSlice.reducer;
