import React from "react";
import { Link } from "react-router-dom";
import {
  CHAT_ROUTE,
  FAVORITES_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
} from "../../Pages/CONST_PAGES";

import Search from "../../Images/navSearch.png";
import Favourite from "../../Images/navFavorite.png";
import Chat from "../../Images/navChat.png";
import Profile from "../../Images/navProfile.png";
import Add from "../../Images/navAdd.svg";

import styles from "./NavbarMobile.module.css";

export default function NavbarMobile() {
  return (
    <div className={styles.navbar_mobile}>
      <Link to={MAIN_ROUTE}>
        <div className={styles.nav_link}>
          <img src={Search} alt="Search" />
        </div>
      </Link>

      <Link to={FAVORITES_ROUTE}>
        <div className={styles.nav_link}>
          <img src={Favourite} alt="Favourite" />
        </div>
      </Link>

      <Link>
        <div className={styles.addBtn}>
          <img src={Add} alt="Add" />
        </div>
      </Link>

      <Link to={CHAT_ROUTE}>
        <div className={styles.nav_link}>
          <img src={Chat} alt="Chat" />
        </div>
      </Link>

      <Link to={PROFILE_ROUTE}>
        <div className={styles.nav_link}>
          <img src={Profile} alt="Profile" />
        </div>
      </Link>
    </div>
  );
}
