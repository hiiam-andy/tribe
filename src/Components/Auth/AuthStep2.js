//step2 ввод юзернейма и пароля, если на первом экране введен емейл
import React, { useEffect, useState } from "react";

import styles from "./AuthWeb.module.css";
import MyButton from "../UI/MyButton/MyButton";
import ShowPassword from "../../Images/showPassword.svg";
import { checkUsername } from "../Profile/http/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setCheckPassword, setPassword, setUsername } from "./authSlice";

export default function AuthStep2({
  loginOrRegistrationToggle,

  registrationWithEmail,
  loginWithEmail,

  hint,
  setHint,
}) {
  const { username, password, phoneOrEmailInput, checkPassword } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  //показать пароль
  const [show, setShow] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const [visibleHint, setVisibleHint] = useState(false);
  const showHint = (text) => {
    setHint(text);
    setVisibleHint(true);
    setTimeout(() => {
      setVisibleHint(false);
    }, 3000);
  };

  const sendForm = async (phoneOrEmailInput, password, username) => {
    await registrationWithEmail(phoneOrEmailInput, password, username);
  };

  const [isUniqueUsername, setIsUniqueUsername] = useState(false);
  useEffect(() => {
    setIsUniqueUsername(false);
    const timer = setTimeout(async () => {
      let isExist;
      if (username.length > 3) {
        isExist = await checkUsername(username);
        if (!isExist) {
          setIsUniqueUsername(true);
        } else {
          showHint("Пользователь с таким юзернеймом уже существует");
        }
      }
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [username]);

  return (
    <>
      {!loginOrRegistrationToggle && (
        <h1 className={styles.auth_heading}>
          Придумайте пароль и уникальное имя
        </h1>
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* инпут юзернейма при регистрации */}
        {!loginOrRegistrationToggle && (
          <>
            <div className={[styles.input_wrapper, styles.step2].join(" ")}>
              @
              <input
                className={[styles.form_input].join(" ")}
                placeholder="Уникальное имя"
                value={username}
                onChange={(e) => dispatch(setUsername(e.target.value))}
              />
              {isUniqueUsername ? (
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
            <h6 className={styles.hint}>{visibleHint ? hint : ""}</h6>
          </>
        )}
        {loginOrRegistrationToggle && (
          <h1 className={styles.auth_heading}>Введите пароль</h1>
        )}

        {/* инпут пароля при логине или регистрации */}
        <div className={[styles.input_wrapper, styles.step2].join(" ")}>
          <input
            className={[styles.form_input].join(" ")}
            placeholder="введите пароль"
            type={!show ? "password" : "text"}
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />

          <label style={{ display: "flex", alignItems: "center" }}>
            <img src={ShowPassword} alt="show" onClick={() => setShow(!show)} />
            <input type="checkbox" style={{ display: "none" }} />
          </label>
        </div>
        <h6 className={styles.hint}>{visibleHint ? hint : ""}</h6>

        {/* инпут повтора пароля при регистрации */}
        {!loginOrRegistrationToggle && (
          <>
            <div className={[styles.input_wrapper, styles.step2].join(" ")}>
              <input
                className={[styles.form_input].join(" ")}
                placeholder="подтвердите пароль"
                type={!showCheck ? "password" : "text"}
                value={checkPassword}
                onChange={(e) => dispatch(setCheckPassword(e.target.value))}
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
            <h6 className={styles.hint}>{visibleHint ? hint : ""}</h6>
          </>
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
