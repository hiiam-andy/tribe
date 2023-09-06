//step1 - экран проверки способа входа телефон/емейл или подтверждение пароля при вхое с емейл
import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

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

  tippy,
  visibleTippy,
  showTippy,
}) {
  const registrationWithEmail = async (phoneOrEmailInput) => {
    const res = await checkEmail(phoneOrEmailInput);
    if (!res) {
      setStep(2);
    } else {
      showTippy("пользователь с таким email существует");
    }
  };

  const submitStepOne = (checkMethodResult) => {
    if (checkMethodResult === "phone") {
      setStep(3);
    } else if (checkMethodResult === "email") {
      !loginOrRegistrationToggle
        ? registrationWithEmail(phoneOrEmailInput)
        : setStep(2);
    } else if (checkMethodResult === "empty") {
      showTippy("заполните поле");
    } else if (checkMethodResult === "incorrect") {
      showTippy("введите корректный телефон или email");
    }
  };

  return (
    <>
      <h1 className={styles.auth_heading}>
        {!loginOrRegistrationToggle ? "Регистрация" : "Авторизация"}
      </h1>

      <div className={styles.step1_wrapper}>
        <div className={[styles.input_wrapper].join(" ")}>
          <Tippy content={tippy} visible={visibleTippy} offset={[10, 20]}>
            <input
              className={styles.form_input}
              placeholder="Телефон/Почта"
              value={checkMethodInput}
              onChange={(e) => {
                setCheckMethodInput(e.target.value);
                setPhoneOrEmailInput(e.target.value.toLowerCase());
              }}
              onKeyDown={() => CheckAuthMethod(checkMethodInput)}
            />
          </Tippy>

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
