import React, { useState } from "react";
import Logo from "../../Images/logo.svg";
import { Link } from "react-router-dom";
import { MAIN_ROUTE } from "../../utils/CONST_PAGES";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUser } from "../../store/authSlice";
import {
  confirmRegistrationEmail,
  loginEmail,
  registrationEmail,
} from "./http/userApi";
import MyButton from "../UI/MyButton/MyButton";
import CloseIcon from "../../Images/searchClose.svg";
import ShowPassword from "../../Images/showPassword.svg";

import styles from "./AuthWeb.module.css";

//step1 - первое окно ввода телефона или пароля
//step2 - окно с юзернеймом и паролем, если введен емейл
//step3 - окно подтверждения для любого метода

export default function Auth() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.authUser);

  //регулярки для проверки: телефон или емейл
  const regEmail =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i;
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
  const [loginOrRegistration, setLoginOrRegistration] = useState(false);

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

  const registrationWithEmail = async (
    phoneOrEmailInput,
    password,
    username
  ) => {
    try {
      const res = await registrationEmail(
        phoneOrEmailInput,
        password,
        username
      );
      alert("одноразовый код " + res.code);
      setRegistrantId(res.registrant_id);
      setConfirmCode(res.code);
      console.log(res.registrant_id, res.code);
      return res;
    } catch (err) {
      alert(err.response.data.error_message);
    }
  };

  const confirmRegistration = async (registrantId, confirmCode) => {
    try {
      const res = await confirmRegistrationEmail(registrantId, confirmCode);
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const loginWithEmail = async (phoneOrEmailInput, password) => {
    try {
      const res = await loginEmail(phoneOrEmailInput, password);
      const newUser = res;
      dispatch(setAuth(true));
      dispatch(setUser(newUser));
      setPhoneOrEmailInput("");
      setPassword("");
    } catch {
      alert("введите корректные логин и пароль");
    }
  };

  const logout = () => {
    dispatch(setUser({}));
    dispatch(setAuth(false));
    localStorage.clear();
  };

  //step1 - экран проверки способа входа телефон/емейл или подтверждение пароля при вхое с емейл
  const stepMethodSelection = (
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

  //step2 ввод юзернейма и пароля, если на первом экране введен емейл
  let stepEmailRegistration = (
    <>
      {!loginOrRegistration && (
        <h1 className={styles.auth_heading}>
          Придумайте пароль и уникальное имя
        </h1>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {!loginOrRegistration && (
          <div className={[styles.input_wrapper, styles.step2].join(" ")}>
            @
            <input
              className={[styles.form_input].join(" ")}
              placeholder="Уникальное имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {loginOrRegistration && (
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
        {!loginOrRegistration && (
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

      {!loginOrRegistration ? (
        <MyButton
          onClick={() => {
            setStep(3);
            registrationWithEmail(phoneOrEmailInput, password, username);
          }}
        >
          Продолжить
        </MyButton>
      ) : (
        <div className={styles.login_btn}>
          <MyButton
            onClick={() => {
              loginWithEmail(phoneOrEmailInput, password);
              console.log(phoneOrEmailInput, password);
            }}
          >
            Войти
          </MyButton>
        </div>
      )}
    </>
  );

  //step3 экран с кодом подтверждения после ввода телефона
  // в первом экране или после второго экрана с емейлом
  let stepVerification;
  if (checkMethodResult === "phone") {
    stepVerification = (
      <div>
        <h1>Введите код из смс</h1>
        <div>
          <input
            placeholder="введите код из смс"
            className={[styles.form_input].join(" ")}
          />
        </div>
        <div>
          <p>
            {phoneOrEmailInput}
            <span style={{ color: "blue" }} onClick={() => setStep(1)}>
              {" "}
              другой телефон
            </span>
          </p>

          <button>Далее</button>
        </div>
      </div>
    );
  } else if (checkMethodResult === "email") {
    stepVerification = (
      <div>
        <h1 className={styles.auth_method_heading}>Введите код:</h1>
        <div>
          <input
            className={[styles.form_input].join(" ")}
            placeholder="введите код"
            value={confirmCode}
            onChange={(e) => setConfirmCode(e.target.value)}
          />
        </div>
        <div>
          на почту <span>{phoneOrEmailInput}</span> был выслан код, введите его
        </div>
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
        <button
          onClick={() =>
            console.log(
              Number(registrantId),
              Number(confirmCode),
              String(registrantId)
            )
          }
        >
          показать
        </button>
      </div>
    );
  }

  return (
    <div className={styles.auth_container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={MAIN_ROUTE}>на главную</Link>
        <button
          onClick={() => {
            console.log(isAuth, user);
          }}
        >
          show
        </button>

        <button
          onClick={() => {
            logout();
          }}
        >
          out
        </button>
      </div>

      <div className={styles.auth_form}>
        <img src={Logo} alt="logo" className={styles.logo} />

        {step === 1 && stepMethodSelection}
        {step === 2 && stepEmailRegistration}
        {step === 3 && stepVerification}
      </div>
    </div>
  );
}
