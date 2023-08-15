import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "./Card";
import { getEvents } from "../../store/eventsSlice";
import style from "./styles/Cards.module.css";

export default function Cards() {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getEvents(page));
  }, [page]);

  const allEvents = events.list.map((event) => (
    <Card
      key={event.eventId}
      id={event.eventId}
      image={event.avatarUrl}
      title={event.eventName}
      place={event.eventAddress.city}
      date={event.startTime}
    />
  ));

  return (
    <div className={style.cards}>
      <div className={style.cards_wrapper}>{allEvents}</div>
      {page === 1 ? (
        <button onClick={() => setPage(page - 1)}>Назад</button>
      ) : (
        <button disabled>Назад</button>
      )}
      <button onClick={() => setPage(page + 1)}>Вперед</button>
    </div>
  );
}
