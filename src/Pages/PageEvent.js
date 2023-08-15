import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../store/eventSlice";
import { BASE_URL } from "../utils/constants";

import { BsHeart, BsHeartFill } from "react-icons/bs";

import styles from "./styles/PageEvent.module.css";

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

  return (
    <div>
      <div className={styles.btn_section}>
        <button className={styles.back_btn} onClick={() => navigate(-1)}>
          ?
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
        alt="event"
      />
      <div className={styles.description_container}>
        <h1 className={styles.description_header}>{event.list.event_name}</h1>
        <img
          className={styles.organizer_photo}
          src={`${BASE_URL}/user/avatar/${event.organizer_photo}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://www.ferremas.com.py/gfx/fotosweb/wprod_0.jpg";
          }}
          alt="Организатор"
        />
        <p className={styles.description_organizer}>
          @{event.list.organizer_username}
        </p>

        <div>{event.list.event_address?.city}</div>
        <div>{event.list.start_time?.substring(0, 10)}</div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {event.list.start_time?.substring(
                11,
                event.list.start_time.length - 4
              )}
            </div>
            <div>{event.list.start_time}</div>
          </div>
        </div>
        <p>{event.list.description}</p>
        {event.list.users_who_participants_of_event?.map((user) => {
          return (
            <img
              key={user.participant_id}
              src={`${BASE_URL}/user/avatar/${user.participant_avatar_url}`}
              alt="подписчики"
            />
          );
        })}
        <div>
          <button>Я пойду</button>
        </div>
      </div>
    </div>
  );
}
