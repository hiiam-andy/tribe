import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useParams } from "react-router-dom";
import { getUser } from "./userSlice";
import FakeAvatar from "../../Images/fakeAvatar.png";
import styles from "./Profile.module.css";
import { SETTINGS_ROUTE } from "../../utils/CONST_PAGES";

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  const { user } = useSelector((store) => store);
  const profile = user.userPage;

  let avatar_url;
  if (profile.avatar_url) {
    avatar_url = profile.avatar_url;
  } else {
    avatar_url = FakeAvatar;
  }

  let profileProfession;
  if (profile.professions > 0) {
    profileProfession = profile.professions.map((el) => <span>{el}/</span>);
  } else {
    profileProfession = "Профессии не заданы";
  }

  let interesting_event_type;
  if (profile.interesting_event_type > 0) {
    interesting_event_type = profile.interesting_event_type.map((el) => {
      return <div key={el.id}>{el.type_name}</div>;
    });
  } else {
    interesting_event_type = "Нет интересов";
  }
  console.log(interesting_event_type);

  return (
    <div>
      <button onClick={() => console.log(profile)}>show</button>
      <div className={styles.profile_container}>
        <img src={avatar_url} alt="avatar" className={styles.profile_avatar} />
        <div className={styles.profile_info}>
          <div className={styles.profile_description}>
            <h1 className={styles.profile_username}>
              {profile.username ? `@${profile.username}` : "Юзернейм не задан"}
            </h1>
            <NavLink to={SETTINGS_ROUTE}>
              <div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_5254_40172)">
                    <rect width="40" height="40" rx="20" fill="#3B4CDC" />
                    <path
                      d="M27.4301 20.98C27.4701 20.66 27.5001 20.34 27.5001 20C27.5001 19.66 27.4701 19.34 27.4301 19.02L29.5401 17.37C29.7301 17.22 29.7801 16.95 29.6601 16.73L27.6601 13.27C27.5401 13.05 27.2701 12.97 27.0501 13.05L24.5601 14.05C24.0401 13.65 23.4801 13.32 22.8701 13.07L22.4901 10.42C22.4601 10.18 22.2501 10 22.0001 10H18.0001C17.7501 10 17.5401 10.18 17.5101 10.42L17.1301 13.07C16.5201 13.32 15.9601 13.66 15.4401 14.05L12.9501 13.05C12.7201 12.96 12.4601 13.05 12.3401 13.27L10.3401 16.73C10.2101 16.95 10.2701 17.22 10.4601 17.37L12.5701 19.02C12.5301 19.34 12.5001 19.67 12.5001 20C12.5001 20.33 12.5301 20.66 12.5701 20.98L10.4601 22.63C10.2701 22.78 10.2201 23.05 10.3401 23.27L12.3401 26.73C12.4601 26.95 12.7301 27.03 12.9501 26.95L15.4401 25.95C15.9601 26.35 16.5201 26.68 17.1301 26.93L17.5101 29.58C17.5401 29.82 17.7501 30 18.0001 30H22.0001C22.2501 30 22.4601 29.82 22.4901 29.58L22.8701 26.93C23.4801 26.68 24.0401 26.34 24.5601 25.95L27.0501 26.95C27.2801 27.04 27.5401 26.95 27.6601 26.73L29.6601 23.27C29.7801 23.05 29.7301 22.78 29.5401 22.63L27.4301 20.98ZM20.0001 23.5C18.0701 23.5 16.5001 21.93 16.5001 20C16.5001 18.07 18.0701 16.5 20.0001 16.5C21.9301 16.5 23.5001 18.07 23.5001 20C23.5001 21.93 21.9301 23.5 20.0001 23.5Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5254_40172">
                      <rect width="40" height="40" rx="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </NavLink>
            <p>{profile.first_name ? profile.first_name : "Имя не задано"}</p>
            <p>{profile.birthday ? profile.birthday : "Возраст не указан"}</p>
            <div>{profileProfession}</div>
          </div>
          <div>Здесь будут подписчики</div>
        </div>
      </div>
      {/* {interesting_event_type} */}
    </div>
  );
}
