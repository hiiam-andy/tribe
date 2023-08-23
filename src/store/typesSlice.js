import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const initialState = {
  list: [],
  selectedType: [],
};

export const getTypes = createAsyncThunk(
  "types/getTypes",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/event/type/info`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const typeSlice = createSlice({
  name: "types",
  initialState,
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTypes.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { setSelectedType } = typeSlice.actions;
export default typeSlice.reducer;
