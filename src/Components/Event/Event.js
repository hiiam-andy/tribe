import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../../store/eventSlice";
import { BASE_URL } from "../../utils/constants";

// import GetEvents from "../store/api/eventsApi";

import {
  BsHeart,
  BsHeartFill,
  BsFillGeoAltFill,
  BsCalendarCheck,
} from "react-icons/bs";
import { MdWatch } from "react-icons/md";
import { GiBackwardTime } from "react-icons/gi";
import { LiaLessThanSolid } from "react-icons/lia";
import MockAvatar from "../../Images/Babushkaboy.png";
import FakeAvatar from "../../Images/fakeAvatar.png";

import styles from "./Event.module.css";
import MyButton from "../../Components/UI/MyButton/MyButton";

export default function PageEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [like, setLike] = useState(false);

  // Редакс Туллкит

  const dispatch = useDispatch();
  const { event } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getEvent(id));
  }, [dispatch, id]);

  //Аксиос

  // const [event, setEvent] = useState([]);
  // useEffect(() => {
  //   fetchEvent();
  // }, []);

  // async function fetchEvent() {
  //   const res = await GetEvents.getOneEvent(id);
  //   setEvent(res);
  // }

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let eventDate = "";
  try {
    eventDate = dateFormatter.format(new Date(event.list.start_time));
  } catch (err) {
    return <span>загружается</span>;
  }

  console.log(event.list.users_who_participants_of_event.length);
  return (
    <section className={styles.event_wrapper}>
      <div className={styles.btn_section}>
        <button className={styles.back_btn} onClick={() => navigate(-1)}>
          <LiaLessThanSolid />
        </button>
        {like ? (
          <BsHeart className={styles.heart} onClick={() => setLike(!like)} />
        ) : (
          <BsHeartFill className={styles.like} onClick={() => setLike(!like)} />
        )}
      </div>
      <img
        className={styles.event_image}
        src={`${BASE_URL}/events/avatars/${event.list.event_photo}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://www.ferremas.com.py/gfx/fotosweb/wprod_0.jpg";
        }}
        alt="event"
      />
      <div className={styles.description_container}>
        <div className={styles.title_organizer_section}>
          <h1 className={styles.description_header}>{event.list.event_name}</h1>
          <img
            className={styles.organizer_photo}
            src={`${BASE_URL}/user/avatar/${event.list.organizer_photo}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = FakeAvatar;
            }}
            alt="Организатор"
          />
        </div>

        <p className={styles.description_organizer_username}>
          @{event.list.organizer_username}
        </p>

        <div className={styles.place_date_section}>
          <div className={styles.description_label}>
            <BsFillGeoAltFill className={styles.event_icon} />
            {event.list.event_address?.city}
          </div>
          <div className={styles.description_label}>
            <BsCalendarCheck className={styles.event_icon} />
            {eventDate}
          </div>
        </div>

        <div className={styles.time_backward_section}>
          <div className={styles.description_label}>
            <MdWatch className={styles.event_icon} />
            {new Date(event.list.start_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className={styles.description_label}>
            <GiBackwardTime className={styles.event_icon} />
            {event.list.start_time}
          </div>
        </div>

        <p className={styles.description_text}>{event.list.description}</p>

        <div className={styles.participant_geo_section}>
          <div className={styles.participant_label}>
            {event.list.users_who_participants_of_event?.map((user) => {
              if (user.participant_avatar_url !== null) {
                return (
                  <img
                    className={styles.participant_avatar}
                    key={user.participant_id}
                    src={`${BASE_URL}/user/avatar/${user.participant_avatar_url}`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src =
                        "https://www.ferremas.com.py/gfx/fotosweb/wprod_0.jpg";
                    }}
                    alt="avatar"
                  />
                );
              } else {
                return (
                  <img
                    className={styles.participant_avatar}
                    src={MockAvatar}
                    alt="avatar"
                  />
                );
              }
            })}
            {event.list.users_who_participants_of_event.length > 2 && (
              <div className={[styles.more_participant].join(" ")}>
                +{event.list.users_who_participants_of_event.length - 2}
              </div>
            )}
          </div>

          <BsFillGeoAltFill className={styles.geo} />
        </div>
        <div className={styles.btn_container}>
          <MyButton className={styles.btn}>Я пойду</MyButton>
        </div>
      </div>
    </section>
  );
}
