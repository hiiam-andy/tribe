import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getEvents } from "../eventsSlice";

import Card from "./Card";
import MyButton from "../../UI/MyButton/MyButton";

import styles from "./styles/Cards.module.css";

export default function Cards() {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getEvents(page));
  }, [dispatch, page]);

  const allEvents = events.list.map((event) => {
    return (
      <Card
        key={event.eventId}
        id={event.eventId}
        image={event.avatarUrl}
        title={event.eventName}
        place={event.eventAddress.city}
        date={event.startTime}
      />
    );
  });

  return (
    <div className={styles.cards}>
      <div className={styles.cards_wrapper}>{allEvents}</div>
      <div className={styles.btn_wrapper}>
        {page === 1 ? (
          <MyButton onClick={() => setPage(page - 1)}>Назад</MyButton>
        ) : (
          <MyButton disabled>Назад</MyButton>
        )}
        <p>Страница{page + 1}</p>
        <MyButton onClick={() => setPage(page + 1)}>Вперед</MyButton>
      </div>
    </div>
  );
}
