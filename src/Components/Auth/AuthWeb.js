import React, { useState } from "react";
import Logo from "../../Images/logo.svg";
import { Link } from "react-router-dom";
import { MAIN_ROUTE } from "../../utils/CONST_PAGES";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUser } from "../../store/authSlice";
import { loginEmail, registrationEmail } from "../../http/userApi";
import styles from "./AuthWeb.module.css";
import MyButton from "../UI/MyButton/MyButton";

//step1 - первое окно ввода телефона или пароля
//step2 - окно с юзернеймом и паролем, если введен емейл
//step3 - окно подтверждения для любого метода

export default function Auth() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.authUser);

  //регулярки для проверки: телефон или емейл
  const regEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i;
  const regPhone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  const [checkMethodInput, setCheckMethodInput] = useState("");
  const [checkMethodResult, setCheckMethodResult] = useState("empty");

  //шаги регистрации
  const [step, setStep] = useState(1);

  //инпуты
  const [phoneOrEmailInput, setPhoneOrEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [loginOrRegistration, setLoginOrRegistration] = useState(true);

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

  const registrationWithEmail = async () => {
    try {
      const res = await registrationEmail(
        phoneOrEmailInput,
        password,
        username
      );
      return res;
    } catch (err) {
      alert(err.response.data.error_message);
    }
  };

  const loginWithEmail = async () => {
    try {
      const res = await loginEmail(phoneOrEmailInput, password);
      const newUser = res;
      dispatch(setAuth(true));
      dispatch(setUser(newUser));
      setPhoneOrEmailInput("");
      setPassword("");
    } catch {
      alert("неправильный логин или пароль");
    }
  };

  const logout = () => {
    dispatch(setUser({}));
    dispatch(setAuth(false));
    localStorage.clear();
  };

  //step1 - экран проверки способа входа телефон/емейл
  const stepMethodSelection = (
    <div style={{ display: "flex" }}>
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
      {checkMethodResult === "phone" && (
        <MyButton onClick={() => setStep(3)}>Далее</MyButton>
      )}
      {checkMethodResult === "email" && (
        <MyButton onClick={() => setStep(2)}>Далее</MyButton>
      )}
      {checkMethodResult === "empty" && (
        <MyButton onClick={() => console.log("заполните поле")}>Далее</MyButton>
      )}
      {checkMethodResult === "incorrect" && (
        <MyButton onClick={() => console.log("неверные данные")}>
          Далее
        </MyButton>
      )}
    </div>
  );

  //step2 ввод юзернейма и пароля, если на первом экране введен емейл
  let stepEmailRegistration = (
    <div>
      <h1>Придумайте пароль и уникальное имя</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          className={styles.form_input}
          placeholder="Уникальное имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.form_input}
          placeholder="введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className={styles.form_input}
          placeholder="подтвердите пароль"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
      </div>
      <MyButton onClick={() => setStep(3)}>Продолжить</MyButton>
    </div>
  );

  //step3 экран с кодом подтверждения
  let stepVerification;
  if (checkMethodResult === "phone") {
    stepVerification = (
      <div>
        <h1>Введите код из смс</h1>
        <div>Четыре квадратика</div>
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
        <div>Четыре квадратика</div>
        <div>
          на почту <span>{phoneOrEmailInput}</span> был выслан код, введите его
        </div>
        <button>Далее</button>
      </div>
    );
  }

  return (
    <div className={styles.auth_container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={MAIN_ROUTE}>на главную</Link>
        <button onClick={() => console.log(isAuth, user)}>show</button>

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

        <h1 className={styles.auth_method_heading}>
          {!loginOrRegistration ? "Регистрация" : "Авторизация"}
        </h1>

        {step === 1 && stepMethodSelection}
        {step === 2 && stepEmailRegistration}
        {step === 3 && stepVerification}

        <div className={styles.login_registration_section}>
          {!loginOrRegistration ? (
            <div>
              Уже есть профиль?{" "}
              <span
                style={{ color: "blue" }}
                onClick={() => setLoginOrRegistration(!loginOrRegistration)}
              >
                Войти
              </span>
            </div>
          ) : (
            <div>
              Нет профиля?{" "}
              <span
                style={{ color: "blue" }}
                onClick={() => setLoginOrRegistration(!loginOrRegistration)}
              >
                Регистрация
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
