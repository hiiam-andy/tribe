import React from "react";
import { Link } from "react-router-dom";
import {
  CHAT_ROUTE,
  FAVORITES_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
} from "../../utils/CONST_PAGES";

import Search from "../../Images/navSearch.svg";
import Favourite from "../../Images/navFavorite.svg";
import Chat from "../../Images/navChat.svg";
import Profile from "../../Images/navProfile.svg";
import Add from "../../Images/navAdd.svg";

import styles from "./NavbarMobile.module.css";

export default function NavbarMobile() {
  return (
    <div className={styles.navbar_mobile}>
      <Link to={MAIN_ROUTE}>
        <div className={styles.nav_link}>
          <img src={Search} alt="Search" className={styles.nav_icon} />
        </div>
      </Link>

      <Link to={FAVORITES_ROUTE}>
        <div className={styles.nav_link}>
          <img src={Favourite} alt="Favourite" className={styles.nav_icon} />
        </div>
      </Link>

      <Link>
        <div className={styles.addBtn}>
          <img src={Add} alt="Add" />
        </div>
      </Link>

      <Link to={CHAT_ROUTE}>
        <div className={styles.nav_link}>
          <img src={Chat} alt="Chat" className={styles.nav_icon} />
        </div>
      </Link>

      <Link to={PROFILE_ROUTE}>
        <div className={styles.nav_link}>
          <img src={Profile} alt="Profile" className={styles.nav_icon} />
        </div>
      </Link>
    </div>
  );
}
