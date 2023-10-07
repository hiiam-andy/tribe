import React, { useState } from "react";
import { BsFillGeoAltFill, BsCalendarCheck, BsHeart } from "react-icons/bs";
import { MdWatch } from "react-icons/md";

import styles from "./styles/Card.module.css";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";

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
  if (image > 1) {
    eventImage =
      "https://sun1-30.userapi.com/s/v1/ig1/zGJLYEDgfvfyPqDcMR7H-BWFH1Wco9waT5TzxZKWAqRSZv3DZ5zD1qZsipxgmxK_kt75LSb0.jpg?size=400x400&quality=96&crop=0,0,799,799&ava=1";
  } else {
    eventImage = `${BASE_URL}/events/avatars/${image[0]}`;
  }

  return (
    <div className={[styles.card, cardStyle].join(" ")}>
      <BsHeart
        className={
          like
            ? [styles.heart, cardStyle].join(" ")
            : [styles.like, cardStyle].join(" ")
        }
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
            className={[styles.image, cardStyle].join(" ")}
            src={eventImage}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://sun1-30.userapi.com/s/v1/ig1/zGJLYEDgfvfyPqDcMR7H-BWFH1Wco9waT5TzxZKWAqRSZv3DZ5zD1qZsipxgmxK_kt75LSb0.jpg?size=400x400&quality=96&crop=0,0,799,799&ava=1";
            }}
            alt="card"
          />
        </div>

        <div className={[styles.info, cardStyle].join(" ")}>
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
