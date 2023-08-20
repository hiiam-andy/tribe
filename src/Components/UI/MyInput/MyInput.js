import React from "react";

import SearchIcon from "../../../Images/search_icon.svg";
import CloseIcon from "../../../Images/searchClose.svg";
import styles from "./MyInput.module.css";
export default function MyInput(props) {
  let { type_password, type_search, type_username } = props;

  let rootClass = [styles.myInput];

  if (type_password) {
    rootClass.push(styles.typePassword);
  }
  if (type_search) {
    rootClass.push(styles.typeSearch);
  }
  if (type_username) {
    rootClass.push(styles.typeUsername);
  }

  let active = false;
  if (props.value.length > 0) {
    active = true;
  }

  return (
    <div className={rootClass.join(" ")}>
      {type_search && <img src={SearchIcon} alt="search" />}
      {type_username && <span>@</span>}
      <input {...props} className={styles.input} />
      {((active && type_search) || type_password) && (
        <img src={CloseIcon} alt="close" />
      )}
    </div>
  );
}
