import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getEvents } from "../eventsSlice";

import Card from "./Card";
import MyButton from "../../UI/MyButton/MyButton";

import styles from "./styles/Cards.module.css";

export default function Cards() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state);

  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("currentPage")) || 0
  );

  useEffect(() => {
    dispatch(getEvents(currentPage));
  }, [dispatch, currentPage]);

  const nextPage = (currentPage) => {
    const page = currentPage + 1;
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
  };
  const previousPage = (currentPage) => {
    const page = currentPage - 1;
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
  };

  const allEvents = events.list.map((event) => {
    return (
      <Card
        key={event.eventId}
        id={event.eventId}
        image={event.avatarUrl}
        title={event.eventName}
        place={event.eventAddress.city}
        date={event.startTime}
        type={"feed"}
      />
    );
  });

  return (
    <div className={styles.cards}>
      <div className={styles.cards_wrapper}>{allEvents}</div>
      <div className={styles.btn_wrapper}>
        <span>
          {currentPage > 0 ? (
            <MyButton onClick={() => previousPage(currentPage)}>Назад</MyButton>
          ) : (
            <MyButton disabled>Назад</MyButton>
          )}
        </span>
        <p>Страница {currentPage + 1}</p>
        <span>
          <MyButton onClick={() => nextPage(currentPage)}>Вперед</MyButton>
        </span>
      </div>
    </div>
  );
}
