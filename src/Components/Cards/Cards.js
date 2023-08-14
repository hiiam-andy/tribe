import React, { useState } from "react";
import Card from "./Card";
import style from "./styles/Cards.module.css";

import { cardsFromApi } from "../../api/fakeCards";

export default function Cards() {
  const [cards, setValue] = useState(cardsFromApi);

  const res = cards.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        image={card.image}
        title={card.title}
        place={card.place}
        date={card.date}
        time={card.time}
        inFav={card.inFav}
      />
    );
  });

  return (
    <div className={style.cards}>
      <div className={style.cards_wrapper}>{res}</div>
    </div>
  );
}
