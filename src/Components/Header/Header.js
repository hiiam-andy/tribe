import React from "react";
import style from "../../styles/Header.module.css";
import logo from "../../Images/logo.svg";
import fav from "../../Images/header_favorite.svg";
import forum from "../../Images/header_forum.svg";
import account from "../../Images/header_account.svg";
import settings from "../../Images/header_settings.svg";

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.header_container}>
        <img src={logo} alt="tribe" className={style.logo} />
        <nav className={style.navigation}>
          <ul className={style.nav_list}>
            <li className={style.nav_link}>
              <img src={fav} alt="favorites" />
            </li>
            <li className={style.nav_link}>
              <button className={style.btn}>Создать событие</button>
            </li>
            <li className={style.nav_link}>
              <img src={forum} alt="forum" />
            </li>
            <li className={style.nav_link}>
              <img src={account} alt="account" />
            </li>
            <li className={style.nav_link}>
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
