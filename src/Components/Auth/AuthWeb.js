import React, { useState } from "react";
import Logo from "../../Images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { EVENTS_ROUTE } from "../../utils/CONST_PAGES";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUser } from "./authSlice";
import {
  confirmRegistrationEmail,
  loginEmail,
  registrationEmail,
} from "./http/authApi";

import styles from "./AuthWeb.module.css";
import AuthStep1 from "./AuthStep1";
import AuthStep2 from "./AuthStep2";
import AuthStep3 from "./AuthStep3";
import AuthStep4 from "./AuthStep4";

//step1 - первое окно ввода телефона или пароля
//step2 - окно с юзернеймом и паролем, если введен емейл
//step3 - окно подтверждения для любого метода

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, authUser } = useSelector((state) => state.auth);

  //регулярки для проверки: телефон или емейл
  const regEmail =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const regPhone =
    // eslint-disable-next-line no-useless-escape
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  //данные для подтвердления регистрации через емейл
  const [registrantId, setRegistrantId] = useState(0);

  const [checkMethodInput, setCheckMethodInput] = useState("");
  const [checkMethodResult, setCheckMethodResult] = useState("empty");

  //шаги регистрации
  const [step, setStep] = useState(1);

  //инпуты
  const [phoneOrEmailInput, setPhoneOrEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  //показать пароль
  const [show, setShow] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  //переключение логин/регистрация
  const [loginOrRegistrationToggle, setLoginOrRegistrationToggle] =
    useState(false);

  //всплывающие подсказки инпутов
  const [tippy, setTippy] = useState("");
  const [visibleTippy, setVisibleTippy] = useState(false);
  const showTippy = (text) => {
    setTippy(text);
    setVisibleTippy(true);
    setTimeout(() => setVisibleTippy(false), 3000);
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
          phoneOrEmailInput,
          password,
          username
        );
        setRegistrantId(res.registrant_id);
        setConfirmCode(res.code);
        setStep(3);
        showTippy("одноразовый код в консоли");
        return res;
      } else {
        showTippy("Пароли не совпадают");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //подтверждение регистрации через емейл
  const confirmRegistration = async (registrantId, confirmCode) => {
    try {
      const res = await confirmRegistrationEmail(registrantId, confirmCode);
      setStep(4);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  //логин через емейл
  const loginWithEmail = async (phoneOrEmailInput, password) => {
    try {
      const res = await loginEmail(phoneOrEmailInput, password);
      const newUser = res;
      dispatch(setAuth(true));
      dispatch(setUser(newUser));
      setPhoneOrEmailInput("");
      setPassword("");
      navigate(EVENTS_ROUTE);
    } catch {
      alert("введите корректные логин и пароль");
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
          <Link to={EVENTS_ROUTE}>на главную</Link>
          <button onClick={() => console.log(isAuth, authUser)}>isAuth?</button>
          <button
            onClick={() => {
              setLoginOrRegistrationToggle(!loginOrRegistrationToggle);
            }}
          >
            toggle
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setStep(1)}>шаг1</button>
          <button onClick={() => setStep(2)}>шаг2</button>
          <button onClick={() => setStep(3)}>шаг3</button>
          <button onClick={() => setStep(4)}>шаг4</button>
        </div>
      </div>

      <div className={styles.auth_form}>
        <img src={Logo} alt="logo" className={styles.logo} />

        {step === 1 && (
          <AuthStep1
            loginOrRegistrationToggle={loginOrRegistrationToggle}
            setLoginOrRegistrationToggle={setLoginOrRegistrationToggle}
            checkMethodInput={checkMethodInput}
            setCheckMethodInput={setCheckMethodInput}
            phoneOrEmailInput={phoneOrEmailInput}
            setPhoneOrEmailInput={setPhoneOrEmailInput}
            CheckAuthMethod={CheckAuthMethod}
            checkMethodResult={checkMethodResult}
            setStep={setStep}
            tippy={tippy}
            visibleTippy={visibleTippy}
            showTippy={showTippy}
          />
        )}

        {step === 2 && (
          <AuthStep2
            username={username}
            loginOrRegistrationToggle={loginOrRegistrationToggle}
            show={show}
            password={password}
            checkPassword={checkPassword}
            setUsername={setUsername}
            setPassword={setPassword}
            setShow={setShow}
            showCheck={showCheck}
            setCheckPassword={setCheckPassword}
            setShowCheck={setShowCheck}
            setStep={setStep}
            registrationWithEmail={registrationWithEmail}
            loginWithEmail={loginWithEmail}
            phoneOrEmailInput={phoneOrEmailInput}
            tippy={tippy}
            visibleTippy={visibleTippy}
            showTippy={showTippy}
          />
        )}
        {step === 3 && (
          <AuthStep3
            checkMethodResult={checkMethodResult}
            phoneOrEmailInput={phoneOrEmailInput}
            setStep={setStep}
            confirmCode={confirmCode}
            setConfirmCode={setConfirmCode}
            confirmRegistration={confirmRegistration}
            registrantId={registrantId}
            registrationWithEmail={registrationWithEmail}
            password={password}
            username={username}
          />
        )}
        {step === 4 && <AuthStep4 />}
      </div>
    </div>
  );
}
