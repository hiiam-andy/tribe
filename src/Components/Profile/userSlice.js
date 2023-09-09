import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (userId, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const profileSlice = createSlice({
  name: "user",
  initialState: {
    userPage: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.userPage = action.payload;
    });
  },
});

export default profileSlice.reducer;
