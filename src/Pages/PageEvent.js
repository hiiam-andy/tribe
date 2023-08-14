import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../store/eventSlice";
import { BASE_URL } from "../utils/constants";

export default function PageEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { event } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getEvent(id));
  }, []);
  const ev = event.list;
  console.log(ev);

  return (
    <div>
      <button onClick={() => navigate(-1)}>назад</button>
      <h1>Страница с номером {id}</h1>
      <img src={`${BASE_URL}/events/avatars/${ev.event_photo}`} alt="event" />
      <h1>{ev.event_name}</h1>
      <p>@{ev.organizer_username}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{ev.event_address.city}</div>
        <div>{ev.start_time.substring(0, 10)}</div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{ev.start_time.substring(11, ev.start_time.length - 4)}</div>
          <div>
            {(Date.now() - Number(Date.parse(ev.start_time))) /
              1000 /
              60 /
              60 /
              24 /
              30}
          </div>
        </div>
      </div>
      <p>{ev.description}</p>
      {ev.users_who_participants_of_event.map((user) => {
        return <img src={user.participant_avatar_url} alt="подписчики" />;
      })}
      <div>
        <button>Я пойду</button>
      </div>
    </div>
  );
}
