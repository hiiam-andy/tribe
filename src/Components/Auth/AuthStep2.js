//step2 ввод юзернейма и пароля, если на первом экране введен емейл
import React, { useState } from "react";

import styles from "./AuthWeb.module.css";
import MyButton from "../UI/MyButton/MyButton";
import ShowPassword from "../../Images/showPassword.svg";
import { checkUsername } from "../Profile/http/userApi";

export default function AuthStep2({
  username,
  show,
  password,
  checkPassword,
  loginOrRegistrationToggle,
  setUsername,
  setPassword,
  setShow,
  showCheck,
  setCheckPassword,
  setShowCheck,
  registrationWithEmail,
  loginWithEmail,
  phoneOrEmailInput,
}) {
  const [isUnique, setIsUnique] = useState(false);

  let interval;
  const checkFreeUsername = (username) => {
    clearTimeout(interval);
    interval = setTimeout(async () => {
      let res = await checkUsername(username);
      if (res) {
        setIsUnique(true);
      } else {
        setIsUnique(false);
        showHint("Пользователь с таким юзернеймом уже существует");
      }
    }, 3000);
  };

  const sendForm = async (phoneOrEmailInput, password, username) => {
    registrationWithEmail(phoneOrEmailInput, password, username);
    setIsUnique(true);
  };

  const [hint, setHint] = useState("");
  const [visibleHint, setVisibleHint] = useState(false);
  const showHint = (text) => {
    setHint(text);
    setVisibleHint(true);
    setTimeout(() => {
      setVisibleHint(false);
    }, 3000);
  };

  return (
    <>
      {!loginOrRegistrationToggle && (
        <h1 className={styles.auth_heading}>
          Придумайте пароль и уникальное имя
        </h1>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {!loginOrRegistrationToggle && (
          <>
            <div className={[styles.input_wrapper, styles.step2].join(" ")}>
              @
              <input
                className={[styles.form_input].join(" ")}
                placeholder="Уникальное имя"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value.toLowerCase());
                  checkFreeUsername(username);
                }}
              />
              {isUnique ? (
                <svg
                  width="18"
                  height="13"
                  viewBox="0 0 18 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5501 12.3861L0.850098 6.68608L2.2751 5.26108L6.5501 9.53608L15.7251 0.361084L17.1501 1.78608L6.5501 12.3861Z"
                    fill="#259716"
                  />
                </svg>
              ) : (
                ""
              )}
            </div>
            {visibleHint && <h6>{hint}</h6>}
          </>
        )}
        {loginOrRegistrationToggle && (
          <h1 className={styles.auth_heading}>Введите пароль</h1>
        )}
        <div className={[styles.input_wrapper, styles.step2].join(" ")}>
          <input
            className={[styles.form_input].join(" ")}
            placeholder="введите пароль"
            type={!show ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label style={{ display: "flex", alignItems: "center" }}>
            <img src={ShowPassword} alt="show" onClick={() => setShow(!show)} />
            <input type="checkbox" style={{ display: "none" }} />
          </label>
        </div>

        {!loginOrRegistrationToggle && (
          <div className={[styles.input_wrapper, styles.step2].join(" ")}>
            <input
              className={[styles.form_input].join(" ")}
              placeholder="подтвердите пароль"
              type={!showCheck ? "password" : "text"}
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />

            <label style={{ display: "flex", alignItems: "center" }}>
              <img
                src={ShowPassword}
                alt="show"
                onClick={() => setShowCheck(!showCheck)}
              />
              <input type="checkbox" style={{ display: "none" }} />
            </label>
          </div>
        )}
      </div>

      {!loginOrRegistrationToggle ? (
        <MyButton
          onClick={() => {
            sendForm(phoneOrEmailInput, password, username);
          }}
        >
          Продолжить
        </MyButton>
      ) : (
        <div className={styles.login_btn}>
          <MyButton
            onClick={() => {
              loginWithEmail(phoneOrEmailInput, password);
            }}
          >
            Войти
          </MyButton>
        </div>
      )}
    </>
  );
}
