import axios from "axios";
import { $host } from "../../../utils/interceptor";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "../../../utils/constants";

//регистрация с емейл
export const registrationEmail = async (email, password, username) => {
  try {
    const res = await $host.post("/auth/registration/email/code", {
      email,
      password,
      username,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Получить код для подтверждения регистрации
export const confirmRegistrationEmail = async (
  registrant_id,
  verification_code,
  firebase_id = registrant_id
) => {
  try {
    const res = await $host.post("/auth/registration/email/confirm", {
      registrant_id,
      verification_code,
      firebase_id,
    });

    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);
    return jwt_decode(res.data.access_token);
  } catch (err) {
    console.log(err);
  }
};

//Войти с помощью емейл
export const loginEmail = async (email, password) => {
  try {
    const res = await $host.post("/auth/login/email", {
      email,
      password,
    });
    localStorage.setItem("user_id", res.data.user_id);
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);
    return jwt_decode(res.data.access_token);
  } catch (err) {
    console.log(err);
  }
};

//Проверить авторизован ли пользователь
export const checkAuth = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/token/refresh`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
      },
    });
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);
    return jwt_decode(res.data.access_token);
  } catch (err) {
    console.log(err);
  }
};
