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
  phoneOrEmailInput: "",
  username: "",
  password: "",
  checkPassword: "",
  step: 1,
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
    setPhoneOrEmailInput: (state, action) => {
      state.phoneOrEmailInput = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setCheckPassword: (state, action) => {
      state.checkPassword = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const {
  setAuth,
  setUser,
  //регулярки
  regEmail,
  regPhone,
  //инпуты
  phoneOrEmailInput,
  setPhoneOrEmailInput,
  username,
  setUsername,
  password,
  setPassword,
  checkPassword,
  setCheckPassword,

  step,
  setStep,
} = authSlice.actions;
export default authSlice.reducer;
