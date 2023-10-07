import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getEvent } from "./eventSlice";
import { BASE_URL } from "../../utils/constants";
import { USER_ROUTE } from "../../utils/CONST_PAGES";

import { BsHeart, BsFillGeoAltFill, BsCalendarCheck } from "react-icons/bs";
import { MdWatch } from "react-icons/md";
import { GiBackwardTime } from "react-icons/gi";
import MockAvatar from "../../Images/Babushkaboy.png";
import FakeAvatar from "../../Images/fakeAvatar.png";
import BackButton from "../../Images/backButton.svg";

import styles from "./Event.module.css";
import MyButton from "../../Components/UI/MyButton/MyButton";
import { addToFavorite } from "../Favorites/http/favoritesApi";

export default function PageEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const oneEvent = useSelector((state) => state.event);
  const event = oneEvent || [];

  useEffect(() => {
    dispatch(getEvent(id));
  }, [dispatch, id]);

  const addFav = (user_id, event_id) => {
    addToFavorite(String(user_id), Number(event_id));
  };

  let eventImage;
  if (!event.list.event_photo) {
    eventImage = "https://www.ferremas.com.py/gfx/fotosweb/wprod_0.jpg";
  } else {
    eventImage = `${BASE_URL}/events/avatars/${event.list.event_photo[0]}`;
  }

  let avatarImage;
  if (!event.list.organizer_photo) {
    avatarImage = FakeAvatar;
  } else {
    avatarImage = `${BASE_URL}/user/avatar/${event.list.organizer_photo}`;
  }

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let eventDate;
  try {
    eventDate = dateFormatter.format(new Date(event.list.start_time));
  } catch (err) {
    return <span>загружается</span>;
  }

  return (
    <section className={styles.event_wrapper}>
      <div className={styles.btn_section}>
        <div className={styles.back_btn}>
          <img
            src={BackButton}
            alt="back"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <BsHeart
          className={styles.like}
          onClick={() => addFav(localStorage.getItem("user_id"), id)}
        />
      </div>
      <img className={styles.event_image} src={eventImage} alt="event" />
      <div className={styles.description_container}>
        <div className={styles.title_organizer_section}>
          <h1 className={styles.description_header}>{event.list.event_name}</h1>
          <NavLink to={USER_ROUTE + `/${event.list.organizer_id}`}>
            <img
              className={styles.organizer_photo}
              src={avatarImage}
              alt="Организатор"
            />
          </NavLink>
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
                    key={user.participant_id}
                    className={styles.participant_avatar}
                    src={MockAvatar}
                    alt="avatar"
                  />
                );
              }
            })}
            {event.list.users_who_participants_of_event?.length > 2 && (
              <div className={[styles.more_participant].join(" ")}>
                +{event.list.users_who_participants_of_event.length - 2}
              </div>
            )}
          </div>

          <BsFillGeoAltFill className={styles.geo} />
        </div>
        <div className={styles.btn_container}>
          {event.list.is_finished !== null ? (
            <MyButton className={styles.btn}>Я пойду</MyButton>
          ) : (
            <div>УЖЕ ЗАВЕРШЕНО</div>
          )}
        </div>
      </div>
    </section>
  );
}
