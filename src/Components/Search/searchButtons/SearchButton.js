import React from "react";
import styles from "./styles/SearchButton.module.css";

export default function SearchButtons2(props) {
  let rootClass = [styles.searchButton];
  if (props.checked) {
    rootClass = [styles.active, styles.searchButton].join(" ");
  } else {
    rootClass = styles.searchButton;
  }
  return (
    <label className={rootClass}>
      <span>{props.name}</span>
      <input type="checkbox" {...props} style={{ display: "none" }} />
    </label>
  );
}
