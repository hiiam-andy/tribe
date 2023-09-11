import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useParams } from "react-router-dom";
import { getProfile } from "./userSlice";
import FakeAvatar from "../../Images/fakeAvatar.png";
import styles from "./Profile.module.css";
import { SETTINGS_ROUTE } from "../../utils/CONST_PAGES";
import { BASE_URL } from "../../utils/constants";
import { subscribeToUser } from "./http/userApi";

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(id));
  }, [id]);

  const { user } = useSelector((store) => store);
  const profile = user.userPage;

  let avatar_url;
  if (profile.avatar_url) {
    avatar_url = `${BASE_URL}/user/avatar/${profile.avatar_url}`;
  } else {
    avatar_url = FakeAvatar;
  }

  let profileProfession;
  if (profile.professions?.length > 0) {
    profileProfession = profile.professions.map((el) => <span>{el}/</span>);
  } else {
    profileProfession = "Профессии не заданы";
  }

  let interests;
  if (profile.interests?.length > 0) {
    interests = profile.interests.map((el) => {
      return (
        <span className={styles.interests} key={el}>
          {el}
        </span>
      );
    });
  } else {
    interests = "Нет интересов";
  }

  return (
    <div className={styles.section_profile}>
      <button onClick={() => console.log(profile)}>show</button>
      <div className={styles.profile_container}>
        <img src={avatar_url} alt="avatar" className={styles.profile_avatar} />
        <div className={styles.profile_info}>
          <div className={styles.profile_description}>
            <h1 className={styles.profile_username}>
              {profile.username ? `@${profile.username}` : "Юзернейм не задан"}
            </h1>
            {Number(localStorage.getItem("user_id")) === profile.user_id ? (
              <NavLink to={SETTINGS_ROUTE}>
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
              </NavLink>
            ) : (
              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  subscribeToUser(
                    Number(localStorage.getItem("user_id")),
                    profile.user_id
                  )
                }
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_5734_16139)">
                    <rect width="40" height="40" rx="20" fill="#3B4CDC" />
                    <path
                      d="M28.806 20.7317C28.1246 20.0387 27.2239 19.6167 26.268 19.5276C27.0932 18.7793 27.6139 17.699 27.6139 16.4923C27.6139 14.2347 25.7987 12.4053 23.5583 12.4053C21.4186 12.4053 19.6666 14.0757 19.5145 16.1928C21.4181 17.0228 22.754 18.9347 22.754 21.1546C22.754 21.9652 22.571 22.7574 22.2307 23.4763C22.7209 23.7345 23.1727 24.0682 23.5666 24.4687C24.5766 25.4936 25.1504 26.9107 25.1395 28.3555L25.1386 28.3849L25.1378 28.4099L25.102 29.0937H29.9598L29.9998 23.6791C30.0081 22.5747 29.579 21.5155 28.806 20.7317Z"
                      fill="white"
                    />
                    <path
                      d="M20.1014 24.1906C20.9262 23.4427 21.4486 22.362 21.4486 21.1553C21.4486 18.8973 19.6326 17.0674 17.3926 17.0674C15.1522 17.0674 13.3366 18.8973 13.3366 21.1553C13.3366 22.3598 13.8569 23.4396 14.6803 24.1879C12.5715 24.3526 10.9058 26.1126 10.8905 28.2798L10.8505 29.0935H17.017H23.7936L23.8337 28.3408C23.8415 27.2368 23.4119 26.1776 22.6394 25.3938C21.9571 24.7004 21.0569 24.2797 20.1014 24.1906Z"
                      fill="white"
                    />
                    <path
                      d="M12.616 14.0098V15.5284C12.616 16.1572 13.1232 16.6679 13.7475 16.6679C14.3728 16.6679 14.8791 16.1572 14.8791 15.5284V14.0098H16.384C17.0084 14.0098 17.5151 13.4987 17.5151 12.8694C17.5151 12.2406 17.0084 11.7294 16.384 11.7294H14.8791V10.2333C14.8791 9.60402 14.3728 9.09375 13.7475 9.09375C13.1232 9.09375 12.616 9.60402 12.616 10.2333V11.729H11.1311C10.5059 11.729 10 12.2401 10 12.869C10 13.4983 10.5059 14.0094 11.1311 14.0094L12.616 14.0098Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5734_16139">
                      <rect width="40" height="40" rx="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            )}
            <p>{profile.full_name ? profile.full_name : "Имя не задано"}</p>
            <p>{profile.age ? profile.age : "Возраст не указан"}</p>
            <div>{profileProfession}</div>
          </div>
          <div>Здесь будут подписчики</div>
        </div>
      </div>
      <div className={styles.interests_wrapper}>{interests}</div>
    </div>
  );
}
