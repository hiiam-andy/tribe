import React, { useState } from "react";
import {
  BsFillGeoAltFill,
  BsCalendarCheck,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { MdWatch } from "react-icons/md";

import style from "../../styles/Cards/Card.module.css";

export default function Card({ image, title, place, date, time }) {
  const [like, setLike] = useState(true);
  const addLike = () => {
    setLike(!like);
  };

  return (
    <div className={style.card}>
      <img className={style.image} src={image} alt="card" />
      <div className={style.info}>
        <div className={style.title}>
          <h1 className={style.title_text}>{title}</h1>
          <div>
            {like ? (
              <BsHeart className={style.heart} onClick={() => addLike()} />
            ) : (
              <BsHeartFill className={style.like} onClick={() => addLike()} />
            )}
          </div>
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
      </div>
    </div>
  );
}
