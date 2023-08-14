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
import { EVENTS_ROUTE } from "../../Pages/CONST_PAGES";

export default function Card({ id, image, title, place, date, time, inFav }) {
  const [like, setLike] = useState(true);
  const addLike = () => {
    setLike(!like);
  };

  return (
    <div className={style.card}>
      {like ? (
        <BsHeart
          className={style.heart}
          onClick={() => {
            addLike();
            console.log(inFav);
          }}
        />
      ) : (
        <BsHeartFill className={style.like} onClick={() => addLike()} />
      )}
      <img className={style.image} src={image} alt="card" />
      <Link to={`/event/${id}`} className={style.info}>
        <div className={style.title}>
          <div className={style.title_text}>{title}</div>
        </div>
        <div className={style.description}>
          <div className={`${style.place} ${style.desc_info}`}>
            <BsFillGeoAltFill className={style.desc_icon} /> {place}
          </div>
          <div className={`${style.date} ${style.desc_info}`}>
            <BsCalendarCheck className={style.desc_icon} />
            {date}
          </div>
          <div className={`${style.time} ${style.desc_info}`}>
            <MdWatch className={style.desc_icon} />
            {time}
          </div>
        </div>
      </Link>
    </div>
  );
}
