//step3 экран с кодом подтверждения после ввода телефона
// в первом экране или после второго экрана с емейлом
import React from "react";
import styles from "./AuthWeb.module.css";
import MyButton from "../UI/MyButton/MyButton";

export default function AuthStep3({
  checkMethodResult,
  phoneOrEmailInput,
  setStep,
  confirmCode,
  setConfirmCode,
  confirmRegistration,
  registrantId,
  username,
  password,
  registrationWithEmail,
}) {
  let stepVerification;
  if (checkMethodResult === "phone") {
    stepVerification = (
      <div className={styles.step3_container}>
        <h1 className={[styles.auth_heading, styles.heading_step3].join(" ")}>
          Введите код из смс
        </h1>
        <div className={[styles.input_wrapper, styles.input_step3].join(" ")}>
          <input maxLength={4} className={styles.form_input} />
        </div>
        <div>
          <div>
            <p>{phoneOrEmailInput}</p>
            <p style={{ color: "#2F89FC" }} onClick={() => setStep(1)}>
              другой телефон
            </p>
          </div>
          <div>
            <p>Не пришел код?</p>
            <p style={{ color: "#2F89FC" }}>Отправить еще.</p>
          </div>
        </div>
        <div>
          <MyButton>Далее</MyButton>
        </div>
      </div>
    );
  } else if (checkMethodResult === "email") {
    stepVerification = (
      <div className={styles.step3_container}>
        <h1 className={[styles.auth_heading, styles.heading_step3].join(" ")}>
          Введите код:
        </h1>
        <div className={[styles.input_wrapper, styles.input_step3].join(" ")}>
          <input
            maxLength={4}
            className={styles.form_input}
            value={confirmCode}
            onChange={(e) => setConfirmCode(e.target.value)}
          />
        </div>

        <div className={styles.form_text_wrapper}>
          на почту
          <a href={phoneOrEmailInput} target="_blank" rel="noreferrer">
            {phoneOrEmailInput}
          </a>
          был выслан код, <br />
          введите его
          <MyButton
            onClick={() =>
              confirmRegistration(
                Number(registrantId),
                Number(confirmCode),
                String(registrantId)
              )
            }
          >
            Далее
          </MyButton>
          <div
            style={{ color: "blue" }}
            onClick={() =>
              registrationWithEmail(phoneOrEmailInput, password, username)
            }
          >
            Отправить еще
          </div>
        </div>
      </div>
    );
  }
  return <>{stepVerification}</>;
}
