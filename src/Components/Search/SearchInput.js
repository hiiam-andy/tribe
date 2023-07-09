import React from "react";
import style from "../../styles/Search/Search.module.css";
import search from "../../Images/search_icon.svg";
import geo from "../../Images/search_geo.svg";

export default function SearchInput() {
  return (
    <div className={style.sectionSearch_input}>
      <div className={style.search_block}>
        <img src={search} alt="search" className={style.search_icon} />
        <input className={style.search_input} />
        <button className={style.btn}>Найти</button>
      </div>
      <div className={style.geo}>
        <img src={geo} alt="geo" className={style.geo_logo} />
        <span className={style.geo_text}>Во всех регионах</span>
      </div>
    </div>
  );
}
