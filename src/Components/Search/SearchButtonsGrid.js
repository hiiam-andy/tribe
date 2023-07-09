import React from "react";
import style from "../../styles/Search/SearchButtonsGrid.module.css";

const dataFromApi = [
  { id: 1, text: "1" },
  { id: 2, text: "2" },
  { id: 3, text: "3" },
  { id: 4, text: "4" },
  { id: 5, text: "5" },
  { id: 6, text: "6" },
  { id: 7, text: "7" },
  { id: 8, text: "8" },
  { id: 9, text: "9" },
  { id: 10, text: "10" },
  { id: 11, text: "11" },
  { id: 12, text: "12" },
  { id: 13, text: "13" },
  { id: 14, text: "14" },
  { id: 15, text: "15" },
  { id: 16, text: "16" },
  { id: 17, text: "17" },
  { id: 16, text: "16" },
  { id: 17, text: "17" },
];

export default function SearchButtonsGrid() {
  let res = dataFromApi.map((el, index) => {
    const greedClassName = [style.item];

    greedClassName.push(`grid${index + 1}`);

    return (
      <div key={el.id} className={greedClassName.join(" ")}>
        контейнер {el.text}
      </div>
    );
  });

  return (
    <div className={style.grid}>
      <div className={style.grid_swiper}>{res}</div>
    </div>
  );
}
