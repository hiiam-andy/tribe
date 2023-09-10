import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "./favoriteSlice";
import { setAuth } from "../Auth/authSlice";
import { checkAuth } from "../Auth/http/authApi";
import Card from "../Event/Cards/Card";
import styles from "./styles/Favorites.module.css";

export default function Favorites() {
  const { favorites } = useSelector((state) => state);
  const fav = favorites.list;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      checkAuth().then(() => {
        dispatch(setAuth(true));
      });
    }
    dispatch(getFavorites(localStorage.getItem("user_id")));
  }, [dispatch]);

  const res = fav.map((el) => {
    return (
      <Card
        key={el.event_id}
        id={el.event_id}
        image={el.event_photo}
        title={el.event_name}
        place={el.event_address?.city}
        date={el.start_time}
        type={"favorites"}
      />
    );
  });
  return (
    <div className={styles.card_wrapper}>
      <h1>Избранное</h1>
      <div>{fav.length} событий</div>
      {res}
    </div>
  );
}
