import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../store/eventSlice";
import { BASE_URL } from "../utils/constants";

import styles from "./styles/PageEvent.module.css";

export default function PageEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

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
          назад
        </button>
      </div>
      <img
        className={styles.event_image}
        src={`${BASE_URL}/events/avatars/${event.list.event_photo}`}
        alt="event"
      />
      <h1>{event.list.event_name}</h1>
      <p>@{event.list.organizer_username}</p>

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
  );
}
