// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BASE_URL } from "../../utils/constants";

// const token = localStorage.getItem("access_token");

// export const addToFavorite = createAsyncThunk(
//   "addToFavorite/setAddToFavorite",
//   async (user_id, event_id) => {
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
//       return err;
//     }
//   }
// );

// const favoriteSlice = createSlice({
//   name: "favorite",
//   initialState: {
//     inFavList: [],
//   },
//   extraReducers: (builder) => {
//     builder.addCase(addToFavorite.fulfilled, (state, action) => {
//       state.inFavList = action.payload;
//       console.log("ok");
//     });
//   },
// });

// export default favoriteSlice.reducer;
