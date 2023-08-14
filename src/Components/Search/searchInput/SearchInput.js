import { React, useState } from "react";
import search from "../../../Images/search_icon.svg";
import close from "../../../Images/searchClose.png";
import filter from "../../../Images/searchFilter.png";

import styles from "./SearchInput.module.css";

export default function SearchInput() {
  const [value, setValue] = useState("");
  return (
    <div className={styles.sectionSearch_input}>
      <div className={styles.search_block}>
        <img src={search} alt="search" className={styles.search_icon} />
        <input
          className={styles.search_input}
          placeholder="Поиск..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <img
          src={close}
          alt="close"
          className={styles.close_icon}
          onClick={() => setValue("")}
        />
      </div>
      <img src={filter} alt="filter" className={styles.filter_icon} />
    </div>
  );
}
