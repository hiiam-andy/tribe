import React from "react";
import { NavLink } from "react-router-dom";

import style from "./styles/NavbarWeb.module.css";

import logo from "../../Images/logo.svg";
import fav from "../../Images/header_favorite.svg";
import forum from "../../Images/header_forum.svg";
import account from "../../Images/header_account.svg";

import {
  CHAT_ROUTE,
  EVENTS_ROUTE,
  FAVORITES_ROUTE,
  USER_ROUTE,
} from "../../utils/CONST_PAGES";

export default function NavbarWeb() {
  return (
    <div className={style.header}>
      <div className={style.header_container}>
        <NavLink to={EVENTS_ROUTE}>
          <img src={logo} alt="tribe" className={style.logo} />
        </NavLink>
        <nav className={style.navigation}>
          <ul className={style.nav_list}>
            <li className={style.nav_link}>
              <NavLink to={FAVORITES_ROUTE}>
                <img src={fav} alt="favorites" />
              </NavLink>
            </li>
            <li className={style.nav_link}>
              <button className={style.btn}>Создать событие</button>
            </li>
            <li className={style.nav_link}>
              <NavLink to={CHAT_ROUTE}>
                <img src={forum} alt="forum" />
              </NavLink>
            </li>
            <li className={style.nav_link}>
              <NavLink to={USER_ROUTE + `/${localStorage.getItem("user_id")}`}>
                <img src={account} alt="account" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
