import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const token = localStorage.getItem("access_token");

export const getFavorites = createAsyncThunk(
  "getFavorites/setGetFavorites",
  async (user_id) => {
    try {
      const res = await axios.get(`${BASE_URL}/events/favorite/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default favoriteSlice.reducer;
