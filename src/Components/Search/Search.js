import React from "react";
import SearchInput from "./SearchInput";
import SearchButtons from "./SearchButtons";
import style from "../../styles/Search/Search.module.css";
// import SearchButtonsGrid from "./SearchButtonsGrid";

export default function Serach() {
  return (
    <div className={style.sectionSearch}>
      <SearchInput />
      <SearchButtons />
      {/* <SearchButtonsGrid /> */}
    </div>
  );
}
