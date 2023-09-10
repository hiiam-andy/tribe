import React, { useState } from "react";
import { BsFillGeoAltFill, BsCalendarCheck, BsHeart } from "react-icons/bs";
import { MdWatch } from "react-icons/md";

import styles from "./styles/Card.module.css";
import { NavLink } from "react-router-dom";

export default function Card({ id, image, title, place, date, type }) {
  const [like, setLike] = useState(true);

  let cardStyle;
  if (type === "favorites") {
    cardStyle = styles.favorites;
  } else if (type === "feed") {
    cardStyle = styles.feed;
  } else if (type === "profile") {
    cardStyle = styles.profile;
  }

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
  if (image !== undefined && image.length > 0) {
    eventImage = image[0];
  }

  return (
    <div className={[styles.card, cardStyle].join(" ")}>
      <BsHeart
        className={like ? styles.heart : styles.like}
        onClick={() => {
          setLike(!like);
        }}
      />

      <NavLink
        to={`/events/${id}`}
        className={[styles.card_wrapper, cardStyle].join(" ")}
      >
        <div className={[styles.image_wrapper, cardStyle].join(" ")}>
          <img
            className={styles.image}
            src={`https://tribual.ru/api/v1/events/avatars/${eventImage}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://www.ferremas.com.py/gfx/fotosweb/wprod_0.jpg";
            }}
            alt="card"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.title}>
            <div className={[styles.title_text, cardStyle].join(" ")}>
              {title}
            </div>
          </div>

          <div className={styles.description}>
            <div
              className={[styles.destription_place_date, cardStyle].join(" ")}
            >
              <div className={`${styles.place} ${styles.desc_info}`}>
                <BsFillGeoAltFill className={styles.desc_icon} /> {place}
              </div>

              <div className={`${styles.date} ${styles.desc_info}`}>
                <BsCalendarCheck className={styles.desc_icon} />

                <span>{eventDate}</span>
              </div>
            </div>

            <div className={`${styles.time} ${styles.desc_info}`}>
              <MdWatch className={styles.desc_icon} />

              {String(date).substring(11, String(date).length - 3)}
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
