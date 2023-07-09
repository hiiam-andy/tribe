import React from "react";
import { useNavigate } from "react-router-dom";

import style from "../../styles/Header.module.css";

import addBtn from "../../Images/header_add.svg";
import logo from "../../Images/logo.svg";
import fav from "../../Images/header_favorite.svg";
import forum from "../../Images/header_forum.svg";
import account from "../../Images/header_account.svg";
import settings from "../../Images/header_settings.svg";

import {
  CHAT_ROUTE,
  EVENT_ROUTE,
  FAVORITES_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from "../../Pages/CONST_PAGES";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className={style.header}>
      <div className={style.header_container}>
        <img
          src={logo}
          alt="tribe"
          className={style.logo}
          onClick={() => navigate(MAIN_ROUTE)}
        />
        <nav className={style.navigation}>
          <ul className={style.nav_list}>
            <li
              className={style.nav_link}
              onClick={() => navigate(FAVORITES_ROUTE)}
            >
              <img src={fav} alt="favorites" />
            </li>
            <li
              className={style.nav_link}
              onClick={() => navigate(EVENT_ROUTE)}
            >
              <button className={style.btn}>Создать событие</button>
              <button className={style.addBtn}>
                <img src={addBtn} alt="addBtn" />
              </button>
            </li>
            <li className={style.nav_link} onClick={() => navigate(CHAT_ROUTE)}>
              <img src={forum} alt="forum" />
            </li>
            <li
              className={style.nav_link}
              onClick={() => navigate(PROFILE_ROUTE)}
            >
              <img src={account} alt="account" />
            </li>
            <li
              className={style.nav_link}
              onClick={() => navigate(SETTINGS_ROUTE)}
            >
              <button className={style.btn_settings}>
                <img src={settings} alt="settings" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
