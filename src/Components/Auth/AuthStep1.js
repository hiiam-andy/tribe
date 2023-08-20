//step1 - экран проверки способа входа телефон/емейл или подтверждение пароля при вхое с емейл
import React from "react";
import MyButton from "../UI/MyButton/MyButton";
import CloseIcon from "../../Images/searchClose.svg";

import styles from "./AuthWeb.module.css";

export default function AuthStep1({
  loginOrRegistration,
  checkMethodInput,
  CheckAuthMethod,
  checkMethodResult,

  setCheckMethodInput,
  setLoginOrRegistration,
  setPhoneOrEmailInput,
  setStep,
}) {
  return (
    <>
      <h1 className={styles.auth_heading}>
        {!loginOrRegistration ? "Регистрация" : "Авторизация"}
      </h1>
      <div className={styles.step1_wrapper}>
        <div className={[styles.input_wrapper].join(" ")}>
          <input
            className={styles.form_input}
            placeholder="Телефон/Почта"
            value={checkMethodInput}
            onChange={(e) => {
              setCheckMethodInput(e.target.value);
              setPhoneOrEmailInput(e.target.value);
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
            <MyButton onClick={() => setStep(2)}>Далее</MyButton>
          )}
          {checkMethodResult === "empty" && (
            <MyButton onClick={() => console.log("заполните поле")}>
              Далее
            </MyButton>
          )}
          {checkMethodResult === "incorrect" && (
            <MyButton onClick={() => console.log("неверные данные")}>
              Далее
            </MyButton>
          )}
        </div>
      </div>
      <div className={styles.login_registration_section}>
        {!loginOrRegistration ? (
          <>
            Уже есть профиль?{" "}
            <span
              className={styles.login_registration_btn}
              onClick={() => {
                setLoginOrRegistration(!loginOrRegistration);
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
                setLoginOrRegistration(!loginOrRegistration);
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
