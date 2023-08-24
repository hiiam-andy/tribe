import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost } from "../../utils/interceptor";

export const addToFav = createAsyncThunk(
  "addToFav/setAddToFav",
  async ({ user_id, event_id }, thunkAPI) => {
    try {
      const res = await $authHost.post("events/favorite", {
        user_id,
        event_id,
      });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const favSlice = createSlice({
  name: "fav",
  initialState: {
    inFavList: [],
    inFav: false,
  },
  extraReducers: (builder) => {
    builder.addCase(addToFav.fulfilled, (state, action) => {
      state.inFavList = action.payload;
      console.log(state.inFavList);
    });
  },
});

export default favSlice.reducer;
