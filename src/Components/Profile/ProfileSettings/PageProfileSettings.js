import React from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../../../Images/backButton.svg";
import { setAuth, setUser } from "../../Auth/authSlice";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../http/userApi";
import { EVENTS_ROUTE } from "../../../utils/CONST_PAGES";

export default function PageProfileSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setUser({}));
    dispatch(setAuth(false));
    localStorage.clear();
    navigate(EVENTS_ROUTE);
  };

  const removeAccount = async (user_id) => {
    try {
      await deleteAccount(user_id);
      dispatch(setUser({}));
      dispatch(setAuth(false));
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#E3E1EC" }}>
      <img src={BackButton} alt="back" onClick={() => navigate(-1)} />
      <h1>Настройки</h1>
      <button onClick={() => logout()}>Выйти из профиля</button>
      <button onClick={() => removeAccount(localStorage.getItem("user_id"))}>
        удалить аккаунт
      </button>
    </div>
  );
}
