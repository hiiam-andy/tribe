import React from "react";
import { chipsFromApi } from "../../../api/fakeChips";
import SearchButton from "./SearchButton";
import styles from "./styles/SearchButtons.module.css";

export default function SearchButtonsItem() {
  const res = chipsFromApi.map((chip) => {
    return (
      <SearchButton key={chip.id} style={{ margin: "0 6px" }}>
        {chip.name}
      </SearchButton>
    );
  });
  return <div className={styles.searchButtons_section}>{res}</div>;
}
