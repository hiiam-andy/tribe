import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

let authUser;
if (localStorage.getItem("access_token")) {
  authUser = jwt_decode(localStorage.getItem("access_token"));
} else {
  authUser = {};
}

const initialState = {
  isAuth: false,
  authUser: authUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { setAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
