import React, { useState } from "react";
import Card from "./Card";
import style from "../../styles/Cards/Cards.module.css";
import axios from "axios";

const dataFromApi = [
  {
    id: 1,
    image: "/static/media/card.26402d71a71cd895f831.png",
    title: "Megaparty party",
    place: "Moscow",
    date: "18.00",
    time: "2023",
  },
  {
    id: 2,
    image: "/static/media/card.26402d71a71cd895f831.png",
    title: "Megaparty party45 verylongtext",
    place: "SPB",
    date: "20.00",
    time: "time",
  },
  {
    id: 3,
    image: "/static/media/card.26402d71a71cd895f831.png",
    title: "Megaparty party3",
    place: "place",
    date: "date",
    time: "time",
  },
  {
    id: 4,
    image: "/static/media/card.26402d71a71cd895f831.png",
    title: "Megaparty party 489",
    place: "place",
    date: "date",
    time: "time",
  },
  {
    id: 5,
    image: "/static/media/card.26402d71a71cd895f831.png",
    title: "title",
    place: "place",
    date: "date",
    time: "time",
  },
  {
    id: 6,
    image: "/static/media/card.26402d71a71cd895f831.png",
    title: "Megaparty party",
    place: "Moscow",
    date: "18.00",
    time: "2023",
  },
  {
    id: 7,
    image: "/static/media/card.26402d71a71cd895f831.png",
    title: "Megaparty party",
    place: "Moscow",
    date: "18.00",
    time: "2023",
  },
  {
    id: 8,
    image: "/static/media/card.26402d71a71cd895f831.png",
    title: "Megaparty party3",
    place: "place",
    date: "date",
    time: "time",
  },
];

export default function Cards() {
  const [cards, setCards] = useState(dataFromApi);

  const res = cards.map((card) => {
    return (
      <Card
        key={card.id}
        image={card.image}
        title={card.title}
        place={card.place}
        date={card.date}
        time={card.time}
      />
    );
  });

  const resFromServ =
    "https://fakerapi.it/api/v1/custom?_quantity=1&id=number&title=name&place=country&date=date&time=date&image=image";

  async function fetchCard() {
    const response = await axios.get(resFromServ);

    setCards(response.data.data);
  }

  return (
    <div className={style.cards}>
      <button onClick={() => fetchCard()}>getCard</button>
      <div className={style.cards_wrapper}>{res}</div>
    </div>
  );
}
