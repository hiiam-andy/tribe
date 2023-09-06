// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BASE_URL } from "../../utils/constants";

// const token = localStorage.getItem("access_token");

// export const addToFav = createAsyncThunk(
//   "addToFav/setAddToFav",
//   async ({ user_id, event_id }, thunkAPI) => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}events/favorite`,
//         {
//           user_id,
//           event_id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return res;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );

// const favSlice = createSlice({
//   name: "fav",
//   initialState: {
//     inFavList: [],
//     inFav: false,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(addToFav.fulfilled, (state, action) => {
//       state.inFavList = action.payload;
//       console.log(state.inFavList);
//     });
//   },
// });

// export default favSlice.reducer;
