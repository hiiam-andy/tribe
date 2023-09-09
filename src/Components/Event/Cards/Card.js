import React, { useState } from "react";
import { BsFillGeoAltFill, BsCalendarCheck, BsHeart } from "react-icons/bs";
import { MdWatch } from "react-icons/md";

import style from "./styles/Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ id, image, title, place, date }) {
  const [like, setLike] = useState(true);

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
      <BsHeart
        className={like ? style.heart : style.like}
        onClick={() => {
          setLike(!like);
        }}
      />
      <Link to={`/events/${id}`}>
        <div className={style.image_wrapper}>
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
        </div>
        <div className={style.info}>
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
              {String(date).substring(11, String(date).length - 3)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
