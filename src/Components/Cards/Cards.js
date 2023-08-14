import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "./Card";
import { getEvents } from "../../store/eventsSlice";
import style from "./styles/Cards.module.css";

export default function Cards() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

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
    </div>
  );
}
