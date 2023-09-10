//step1 - экран проверки способа входа телефон/емейл или подтверждение пароля при вхое с емейл
import React, { useState } from "react";

import { checkEmail } from "../Profile/http/userApi";

import MyButton from "../UI/MyButton/MyButton";
import CloseIcon from "../../Images/searchClose.svg";

import styles from "./AuthWeb.module.css";

export default function AuthStep1({
  loginOrRegistrationToggle,
  checkMethodInput,
  CheckAuthMethod,
  checkMethodResult,
  phoneOrEmailInput,

  setCheckMethodInput,
  setLoginOrRegistrationToggle,
  setPhoneOrEmailInput,
  setStep,
}) {
  const [hint, setHint] = useState("");
  const [visibleHint, setVisibleHint] = useState(false);
  const showHint = (text) => {
    setHint(text);
    setVisibleHint(true);
    setTimeout(() => {
      setVisibleHint(false);
    }, 3000);
  };

  const registrationWithEmail = async (phoneOrEmailInput) => {
    const res = await checkEmail(phoneOrEmailInput);
    if (!res) {
      setStep(2);
    } else {
      showHint("пользователь с таким email существует");
    }
  };

  const submitStepOne = async (checkMethodResult) => {
    if (checkMethodResult === "phone") {
      setStep(3);
    } else if (checkMethodResult === "email") {
      if (!loginOrRegistrationToggle) {
        registrationWithEmail(phoneOrEmailInput);
      } else {
        const res = await checkEmail(phoneOrEmailInput);
        res ? setStep(2) : showHint("пользователя с таким email не существует");
      }
    } else if (checkMethodResult === "empty") {
      showHint("заполните поле");
    } else if (checkMethodResult === "incorrect") {
      showHint("введите корректный телефон или email");
    }
  };

  return (
    <>
      <h1 className={styles.auth_heading}>
        {!loginOrRegistrationToggle ? "Регистрация" : "Авторизация"}
      </h1>

      <div className={styles.step1_wrapper}>
        <div className={styles.input_wrapper}>
          <input
            className={styles.form_input}
            placeholder="Телефон/Почта"
            value={checkMethodInput}
            onChange={(e) => {
              setCheckMethodInput(e.target.value);
              setPhoneOrEmailInput(e.target.value.toLowerCase());
            }}
            onKeyUp={() => CheckAuthMethod(checkMethodInput)}
            onBlur={() => CheckAuthMethod(checkMethodInput)}
          />

          {checkMethodInput.length > 0 && (
            <img
              src={CloseIcon}
              alt="close"
              onClick={() => setCheckMethodInput("")}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>

        <div className={styles.step1_btn_wrapper}>
          <MyButton onClick={() => submitStepOne(checkMethodResult)}>
            Далее
          </MyButton>
        </div>
      </div>
      {visibleHint ? (
        <div className={styles.hint}>{hint}</div>
      ) : (
        <div className={styles.hint}></div>
      )}

      <div className={styles.login_registration_section}>
        <>
          {!loginOrRegistrationToggle ? "Уже есть профиль?" : "Нет Профиля?"}
          <span
            className={styles.login_registration_btn}
            onClick={() => {
              setLoginOrRegistrationToggle(!loginOrRegistrationToggle);
              setStep(1);
            }}
          >
            {!loginOrRegistrationToggle ? "Войти" : "Регистрация"}
          </span>
        </>
      </div>
    </>
  );
}
