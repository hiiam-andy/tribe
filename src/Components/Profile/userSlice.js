import axios from "axios";
import { $authHost } from "../../utils/interceptor";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, thunkAPI) => {
    try {
      const res = await axios($authHost.get(`/user/${userId}`));
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
