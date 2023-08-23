import { React, useState } from "react";
import search from "../../../Images/search_icon.svg";
import close from "../../../Images/searchClose.svg";
import filter from "../../../Images/searchFilter.svg";

import styles from "./SearchInput.module.css";

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className={styles.sectionSearch_input}>
      <div className={styles.search_block}>
        <img src={search} alt="search" className={styles.search_icon} />
        <input
          className={styles.search_input}
          placeholder="Поиск..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        {searchValue.length > 0 && (
          <img
            src={close}
            alt="close"
            className={styles.close_icon}
            onClick={() => setSearchValue("")}
          />
        )}
      </div>
      <img src={filter} alt="filter" className={styles.filter_icon} />
    </div>
  );
}
