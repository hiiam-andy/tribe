import React from "react";
import styles from "./MyButton.module.css";

export default function MyButton(props) {
  return (
    <button {...props} className={[styles.myBtn, props.className].join(" ")}>
      {props.children}
    </button>
  );
}
