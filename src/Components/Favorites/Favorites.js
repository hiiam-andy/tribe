import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "./favoriteSlice";
import { setAuth } from "../Auth/authSlice";
import { checkAuth } from "../Auth/http/authApi";
import Card from "../Event/Cards/Card";
import styles from "./styles/Favorites.module.css";

export default function Favorites() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      checkAuth().then(() => {
        dispatch(setAuth(true));
      });
    }
    dispatch(getFavorites(localStorage.getItem("user_id")));
  }, [dispatch]);

  const favorites = useSelector((state) => state.favorites.list);
  const fav = favorites || [];

  const favList = fav.map((el) => {
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
    <div className={styles.page_wrapper}>
      <div className={styles.favorites_heading}>
        <h1 className={styles.favorites_heading__title}>Избранное</h1>
        <p className={styles.favorites_heading__counter}>
          {fav.length} событий
        </p>
      </div>
      {favList}
    </div>
  );
}
