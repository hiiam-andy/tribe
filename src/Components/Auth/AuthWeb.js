import React, { useState } from "react";
import Logo from "../../Images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { EVENTS_ROUTE } from "../../utils/CONST_PAGES";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuth,
  setPhoneOrEmailInput,
  setPassword,
  setStep,
} from "./authSlice";
import {
  confirmRegistrationEmail,
  loginEmail,
  registrationEmail,
} from "./http/authApi";

import styles from "./AuthWeb.module.css";
import AuthStep1 from "./AuthStep1";
import AuthStep2 from "./AuthStep2";
import AuthStep3 from "./AuthStep3";

//step1 - первое окно ввода телефона или пароля
//step2 - окно с юзернеймом и паролем, если введен емейл
//step3 - окно подтверждения для любого метода

//регулярки для проверки: телефон или емейл
const regEmail =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const regPhone =
  // eslint-disable-next-line no-useless-escape
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, checkPassword } = useSelector((state) => state.auth);

  //данные для подтвердления регистрации через емейл
  const [registrantId, setRegistrantId] = useState(0);

  const [checkMethodInput, setCheckMethodInput] = useState("");
  const [checkMethodResult, setCheckMethodResult] = useState("empty");

  //инпуты
  const [confirmCode, setConfirmCode] = useState("");

  //переключение логин/регистрация
  const [loginOrRegistrationToggle, setLoginOrRegistrationToggle] =
    useState(false);

  //всплывающие подсказки инпутов
  const [hint, setHint] = useState("");
  const [visibleHint, setVisibleHint] = useState(false);
  const showHint = (text) => {
    setHint(text);
    setVisibleHint(true);
    setTimeout(() => setVisibleHint(false), 3000);
  };

  //проверка поля ввода первого экрана
  const CheckAuthMethod = (checkMethodInput) => {
    if (regEmail.test(checkMethodInput)) {
      setCheckMethodResult("email");
    } else if (regPhone.test(checkMethodInput)) {
      setCheckMethodResult("phone");
    } else if (!checkMethodInput || checkMethodInput === "") {
      setCheckMethodResult("empty");
    } else if (
      !regEmail.test(checkMethodInput) &&
      !regPhone.test(checkMethodInput)
    ) {
      setCheckMethodResult("incorrect");
    }
  };

  //регистрация через емейл
  const registrationWithEmail = async (
    phoneOrEmailInput,
    password,
    username
  ) => {
    try {
      if (password === checkPassword) {
        const res = await registrationEmail(
          String(phoneOrEmailInput),
          String(password),
          String(username)
        );
        setRegistrantId(res.registrant_id);
        dispatch(setStep(3));
        return res;
      } else {
        alert("Пароли не совпадают");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //подтверждение регистрации через емейл
  const confirmRegistration = async (registrantId, confirmCode) => {
    try {
      const res = await confirmRegistrationEmail(registrantId, confirmCode);
      dispatch(setStep(1));
      navigate(EVENTS_ROUTE);
      window.location.reload();
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  //логин через емейл
  const loginWithEmail = async (phoneOrEmailInput, password) => {
    try {
      const res = await loginEmail(phoneOrEmailInput, password);
      console.log(res);
      if (res) {
        dispatch(setAuth(true));
        dispatch(setPhoneOrEmailInput(""));
        dispatch(setPassword(""));
        dispatch(setStep(1));
        navigate(EVENTS_ROUTE);
        window.location.reload();
      } else {
        alert("введите корректные логин и пароль");
      }
      return;
    } catch (err) {
      console.log("не вышло");
    }
  };

  return (
    <div className={styles.auth_container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Link to={EVENTS_ROUTE}>на главную</Link> */}
          {/* <button onClick={() => console.log(isAuth)}>isAuth?</button>
          <button
            onClick={() => {
              setLoginOrRegistrationToggle(!loginOrRegistrationToggle);
            }}
          >
            toggle
          </button> */}
        </div>
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => dispatch(setStep(1))}>шаг1</button>
          <button onClick={() => dispatch(setStep(2))}>шаг2</button>
          <button onClick={() => dispatch(setStep(3))}>шаг3</button>
        </div> */}
      </div>

      <div className={styles.auth_form}>
        <img src={Logo} alt="logo" className={styles.logo} />

        {step === 1 && (
          <AuthStep1
            loginOrRegistrationToggle={loginOrRegistrationToggle}
            checkMethodInput={checkMethodInput}
            CheckAuthMethod={CheckAuthMethod}
            checkMethodResult={checkMethodResult}
            setCheckMethodInput={setCheckMethodInput}
            setLoginOrRegistrationToggle={setLoginOrRegistrationToggle}
            setPhoneOrEmailInput={setPhoneOrEmailInput}
          />
        )}

        {step === 2 && (
          <AuthStep2
            loginOrRegistrationToggle={loginOrRegistrationToggle}
            registrationWithEmail={registrationWithEmail}
            loginWithEmail={loginWithEmail}
          />
        )}
        {step === 3 && (
          <AuthStep3
            checkMethodResult={checkMethodResult}
            confirmCode={confirmCode}
            setConfirmCode={setConfirmCode}
            confirmRegistration={confirmRegistration}
            registrantId={registrantId}
            registrationWithEmail={registrationWithEmail}
          />
        )}
      </div>
    </div>
  );
}
