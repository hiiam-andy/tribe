import React, { useState } from "react";
import Logo from "../../Images/logo.svg";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";
import { MAIN_ROUTE } from "../../utils/CONST_PAGES";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUser } from "../../store/authSlice";
import { loginEmail, registrationEmail } from "../../http/userApi";
import styles from "./AuthWeb.module.css";
import MyButton from "../UI/MyButton/MyButton";

export default function Auth() {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.authUser);

  const [checked, setChecked] = useState(true);
  const [method, setMethod] = useState(true);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("test@test.test");
  const [password, setPassword] = useState("123");
  const [username, setUsername] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const registrationWithEmail = async () => {
    try {
      const res = await registrationEmail(email, password);
      return res;
    } catch (err) {
      alert(err.response.data.error_message);
    }
  };

  const loginWithEmail = async () => {
    try {
      const res = await loginEmail(email, password);
      const newUser = res;
      dispatch(setAuth(true));
      dispatch(setUser(newUser));
      setEmail("");
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

  let res;
  if (!checked) {
    res = (
      <input
        className={styles.form_input}
        placeholder="введите телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    );
  } else {
    res = (
      <div className={styles.inputs}>
        <input
          className={styles.form_input}
          placeholder="введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.form_input}
          placeholder="введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!method && (
          <input
            className={styles.form_input}
            placeholder="подтвердите пароль"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => console.log(isAuth, user)}>show</button>

        <button onClick={() => registrationWithEmail()}>registration</button>

        <button
          onClick={() => {
            logout();
          }}
        >
          out
        </button>

        <Link to={MAIN_ROUTE}>на главную</Link>
      </div>

      <div>
        <span>телефон</span>
        <Switch
          checked={checked}
          onChange={() => setChecked(!checked)}
        ></Switch>
        <span>email</span>
      </div>

      <div className={styles.auth_form}>
        <img src={Logo} alt="logo" className={styles.logo} />

        <h3>{!method ? "Регистрация" : "Авторизация"}</h3>

        <div>
          <div>
            <div>{res}</div>
            {password && email ? (
              <MyButton onClick={() => loginWithEmail()}>Далее</MyButton>
            ) : (
              <MyButton disabled>Далее</MyButton>
            )}

            <div>
              {!method ? (
                <div>
                  Уже есть профиль?{" "}
                  <span
                    style={{ color: "blue" }}
                    onClick={() => setMethod(!method)}
                  >
                    Войти
                  </span>
                </div>
              ) : (
                <div>
                  Нет профиля?{" "}
                  <span
                    style={{ color: "blue" }}
                    onClick={() => setMethod(!method)}
                  >
                    Регистрация
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
