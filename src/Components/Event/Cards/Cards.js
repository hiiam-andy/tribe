import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import styles from "./styles/Cards.module.css";
import { BASE_URL } from "../../../utils/constants";
import { setLoading, setPage } from "../eventsSlice";

export default function Cards() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.list);
  const isLoading = useSelector((state) => state.events.isLoading);
  const page = useSelector((state) => state.events.page);
  const eventList = events || [];

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      20
    ) {
      dispatch(setLoading(true));
    }
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => fetchMoreData(), 0);
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  const fetchMoreData = () => {
    dispatch(setPage(page + 1));
  };

  const allEvents = eventList.map((event) => {
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
    </div>
  );
}
