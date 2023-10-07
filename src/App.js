import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./Pages/AppRouter";
import { useDispatch, useSelector } from "react-redux";

import { setAuth } from "./Components/Auth/authSlice";
import { checkAuth } from "./Components/Auth/http/authApi";
import NavbarWeb from "./Components/NavbarWeb/NavbarWeb";
import { getEvents } from "./Components/Event/eventsSlice";

function App() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.events);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      checkAuth().then(() => {
        dispatch(setAuth(true));
      });
    }
    dispatch(getEvents(page));
  }, [dispatch, page]);

  return (
    <BrowserRouter>
      <NavbarWeb />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
