import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log("ошибка" + err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userPage: [],
    favorites: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userPage = action.payload;
    });
  },
});

export default userSlice.reducer;
