//step1 - экран проверки способа входа телефон/емейл или подтверждение пароля при вхое с емейл
import React from "react";
import MyButton from "../UI/MyButton/MyButton";
import CloseIcon from "../../Images/searchClose.svg";

import styles from "./AuthWeb.module.css";
import { checkEmail } from "./http/authApi";

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
  const registrationWithEmail = async (phoneOrEmailInput) => {
    const res = await checkEmail(phoneOrEmailInput);
    if (!res) {
      setStep(2);
    } else {
      alert("пользователь с таким email существует");
    }
  };

  return (
    <>
      <h1 className={styles.auth_heading}>
        {!loginOrRegistrationToggle ? "Регистрация" : "Авторизация"}
      </h1>

      <div className={styles.step1_wrapper}>
        <div className={[styles.input_wrapper].join(" ")}>
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

          {checkMethodInput.length > 0 && (
            <img
              src={CloseIcon}
              alt="close"
              onClick={() => setCheckMethodInput("")}
            />
          )}
        </div>

        <div className={styles.step1_btn_wrapper}>
          {checkMethodResult === "phone" && (
            <MyButton onClick={() => setStep(3)}>Далее</MyButton>
          )}

          {checkMethodResult === "email" && (
            <MyButton
              onClick={() => {
                !loginOrRegistrationToggle
                  ? registrationWithEmail(phoneOrEmailInput)
                  : setStep(2);
              }}
            >
              Далее
            </MyButton>
          )}

          {checkMethodResult === "empty" && (
            <MyButton onClick={() => alert("заполните поле")}>Далее</MyButton>
          )}

          {checkMethodResult === "incorrect" && (
            <MyButton onClick={() => alert("неверные данные")}>Далее</MyButton>
          )}
        </div>
      </div>

      <div className={styles.login_registration_section}>
        {!loginOrRegistrationToggle ? (
          <>
            Уже есть профиль?{" "}
            <span
              className={styles.login_registration_btn}
              onClick={() => {
                setLoginOrRegistrationToggle(!loginOrRegistrationToggle);
                setStep(1);
              }}
            >
              Войти
            </span>
          </>
        ) : (
          <>
            Нет профиля?{" "}
            <span
              className={styles.login_registration_btn}
              onClick={() => {
                setLoginOrRegistrationToggle(!loginOrRegistrationToggle);
                setStep(1);
              }}
            >
              Регистрация
            </span>
          </>
        )}
      </div>
    </>
  );
}
