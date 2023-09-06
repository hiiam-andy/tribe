//step2 ввод юзернейма и пароля, если на первом экране введен емейл
import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

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

  tippy,
  visibleTippy,
  showTippy,
}) {
  const checkFreeUsername = async (username) => {
    let res = await checkUsername(username);
    if (!res) {
      registrationWithEmail(phoneOrEmailInput, password, username);
    } else {
      showTippy("Пользователь с таким юзернеймом уже существует");
    }
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
          <Tippy content={tippy} visible={visibleTippy} offset={[10, 20]}>
            <div className={[styles.input_wrapper, styles.step2].join(" ")}>
              @
              <label>
                <input
                  className={[styles.form_input].join(" ")}
                  placeholder="Уникальное имя"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value.toLowerCase());
                  }}
                />
              </label>
            </div>
          </Tippy>
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
            checkFreeUsername(username);
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
