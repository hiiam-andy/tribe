import React from "react";
import styles from "./styles/SearchButton.module.css";

export default function SearchButtons2(props) {
  let rootClass = [styles.searchButton];
  if (props.active) {
    rootClass = [styles.active, styles.searchButton].join(" ");
  } else {
    rootClass = styles.searchButton;
  }
  return (
    <button className={rootClass} {...props}>
      {props.children}
    </button>
  );
}
