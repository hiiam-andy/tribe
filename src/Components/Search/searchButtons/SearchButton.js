import React from "react";
import styles from "./styles/SearchButton.module.css";

export default function SearchButton(props) {
  return (
    <button {...props} className={styles.searchButton}>
      {props.children}
    </button>
  );
}
