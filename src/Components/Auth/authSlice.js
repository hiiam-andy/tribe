import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,

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
  //инпуты
  setPhoneOrEmailInput,
  setUsername,
  setPassword,
  setCheckPassword,
  //шаги регистрации
  setStep,
} = authSlice.actions;
export default authSlice.reducer;
