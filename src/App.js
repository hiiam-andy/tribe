import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./Pages/AppRouter";
import { useDispatch } from "react-redux";

import { setAuth } from "./Components/Auth/authSlice";
import { checkAuth } from "./Components/Auth/http/authApi";
import { checkAuth } from "./Components/Auth/http/authApi";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      checkAuth().then(() => {
        dispatch(setAuth(true));
      });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
