import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./Pages/AppRouter";
import { useDispatch } from "react-redux";

import { check } from "./http/userApi";
import { setAuth } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  let token = localStorage.getItem("refresh_token");

  useEffect(() => {
    token &&
      check().then(() => {
        dispatch(setAuth(true));
      });
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
