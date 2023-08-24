import { $authHost, $host } from "../../../utils/interceptor";
import jwt_decode from "jwt-decode";

//Проверить не занят ли емейл
export const checkEmail = async (email) => {
  const res = await $host.get(`/user/email/check/${email}`);
  return res.data;
};

//проверить существует ли пользователь с юзернейм
export const checkUsername = async (username) => {
  const res = await $host.get(`/user/username/check/${username}`);
  return res.data;
};

//регистрация с емейл
export const registrationEmail = async (email, password, username) => {
  const res = await $host.post("/auth/registration/email/code", {
    email,
    password,
    username,
  });
  return res.data;
};

//Получить код для подтверждения регистрации
export const confirmRegistrationEmail = async (
  registrant_id,
  verification_code,
  firebase_id = registrant_id
) => {
  const res = await $host.post("/auth/registration/email/confirm", {
    registrant_id,
    verification_code,
    firebase_id,
  });
  localStorage.setItem("refresh_token", res.data.refresh_token);
  localStorage.setItem("access_token", res.data.access_token);
  return jwt_decode(res.data.access_token);
};

//Войти с помощью емейл
export const loginEmail = async (email, password) => {
  const res = await $host.post("/auth/login/email", {
    email,
    password,
  });
  localStorage.setItem("user_id", res.data.user_id);
  localStorage.setItem("refresh_token", res.data.refresh_token);
  localStorage.setItem("access_token", res.data.access_token);
  return jwt_decode(res.data.access_token);
};

//Проверить авторизован ли пользователь
export const checkAuth = async () => {
  const res = await $authHost.get("/auth/token/refresh");
  localStorage.setItem("refresh_token", res.data.refresh_token);
  localStorage.setItem("access_token", res.data.access_token);
  return jwt_decode(res.data.access_token);
};
