import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (page, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/events/search?page=${page}&size=15`);
      return res.data.content;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    page: 0,
    isLoading: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.list = [...state.list, ...action.payload];
    });
  },
});

export const { setPage, setLoading } = eventsSlice.actions;

export default eventsSlice.reducer;
