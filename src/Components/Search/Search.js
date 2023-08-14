import React from "react";
import SearchInput from "./searchInput/SearchInput";
import SearchButtons from "./searchButtons/SearchButtons";
import styles from "./Search.module.css";

export default function Serach() {
  return (
    <div className={styles.sectionSearch}>
      <SearchInput />
      <SearchButtons />
    </div>
  );
}
