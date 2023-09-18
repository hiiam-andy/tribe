import React, { useState } from "react";
import Logo from "../../Images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { EVENTS_ROUTE } from "../../utils/CONST_PAGES";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuth,
  setUser,
  setPhoneOrEmailInput,
  setPassword,
  setStep,
} from "./authSlice";
import {
  confirmRegistrationEmail,
  loginEmail,
  registrationEmail,
  // registrationPhone,
} from "./http/authApi";

import styles from "./AuthWeb.module.css";
import AuthStep1 from "./AuthStep1";
import AuthStep2 from "./AuthStep2";
import AuthStep3 from "./AuthStep3";
import AuthStep4 from "./AuthStep4";

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
  const {
    isAuth,
    authUser,
    // phoneOrEmailInput,
    // username,
    // password,
    step,
    checkPassword,
  } = useSelector((state) => state.auth);

  //данные для подтвердления регистрации через емейл
  const [registrantId, setRegistrantId] = useState(0);

  const [checkMethodInput, setCheckMethodInput] = useState("");
  const [checkMethodResult, setCheckMethodResult] = useState("empty");

  //шаги регистрации
  // const [step, setStep] = useState(1);

  //инпуты
  // const [username, setUsername] = useState("");
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
        console.log(res.code);
        setRegistrantId(res.registrant_id);
        dispatch(setStep(3));
        alert("одноразовый код в консоли!");
        return res;
      } else {
        showHint("Пароли не совпадают");
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
        const newUser = res;
        dispatch(setAuth(true));
        dispatch(setUser(newUser));
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

  //регистрация через телефон
  // const registrationWithPhone = async (phoneNumber) => {
  //   try {
  //       const res = await registrationPhone(
  //         phoneNumber
  //       );
  //       setRegistrantId(res.registrant_id);
  //       setConfirmCode(res.code);
  //       setStep(3);
  //       alert("одноразовый код в консоли");
  //       return res;

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
          {/* <button onClick={() => console.log(isAuth, authUser)}>isAuth?</button>
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
          <button onClick={() => dispatch(setStep(4))}>шаг4</button>
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
            hint={hint}
            visibleHint={visibleHint}
            showHint={showHint}
          />
        )}

        {step === 2 && (
          <AuthStep2
            loginOrRegistrationToggle={loginOrRegistrationToggle}
            registrationWithEmail={registrationWithEmail}
            loginWithEmail={loginWithEmail}
            hint={hint}
            visibleHint={visibleHint}
            showHint={showHint}
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
        {step === 4 && <AuthStep4 />}
      </div>
    </div>
  );
}
