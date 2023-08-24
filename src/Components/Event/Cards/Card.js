import React, { useState } from "react";
import {
  BsFillGeoAltFill,
  BsCalendarCheck,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { MdWatch } from "react-icons/md";

import style from "./styles/Card.module.css";
import { Link } from "react-router-dom";
import { addToFav } from "../../Favorites/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Card({ id, image, title, place, date }) {
  const dispatch = useDispatch();
  const { inFav } = useSelector((store) => store.fav);

  const [like, setLike] = useState(true);
  const user_id = localStorage.getItem("user_id");

  const addToFavorite = (user_id, event_id) => {
    dispatch(addToFav(user_id, event_id));
    setLike(!like);
  };

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let eventDate;
  try {
    eventDate = dateFormatter.format(new Date(date));
  } catch {
    return <span>загружается</span>;
  }

  let eventImage;
  if (image !== undefined && image.length >= 1) {
    eventImage = image[0];
  }

  return (
    <div className={style.card}>
      {like ? (
        <BsHeart
          className={style.heart}
          onClick={() => {
            addToFavorite(user_id, id);
          }}
        />
      ) : (
        <BsHeartFill className={style.like} onClick={() => setLike(!like)} />
      )}
      <img
        className={style.image}
        src={`https://tribual.ru/api/v1/events/avatars/${eventImage}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://www.ferremas.com.py/gfx/fotosweb/wprod_0.jpg";
        }}
        alt="card"
      />
      <Link to={`/events/${id}`} className={style.info}>
        <div className={style.title}>
          <div className={style.title_text}>{title}</div>
        </div>
        <div className={style.description}>
          <div className={`${style.place} ${style.desc_info}`}>
            <BsFillGeoAltFill className={style.desc_icon} /> {place}
          </div>
          <div className={`${style.date} ${style.desc_info}`}>
            <BsCalendarCheck className={style.desc_icon} />
            {eventDate}
          </div>
          <div className={`${style.time} ${style.desc_info}`}>
            <MdWatch className={style.desc_icon} />
            {date.substring(11, date.length - 3)}
          </div>
        </div>
      </Link>
    </div>
  );
}