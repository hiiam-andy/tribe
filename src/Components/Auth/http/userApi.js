import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registrationEmail = async (email, password, username) => {
  const res = await $host.post("/auth/registration/email/code", {
    email,
    password,
    username,
  });
  return res.data;
};

export const confirmRegistrationEmail = async (
  registrant_id,
  verification_code,
  firebase_id
) => {
  const res = await $host.post("/auth/registration/email/confirm", {
    registrant_id,
    verification_code,
    firebase_id,
  });
  console.log(res);

  // localStorage.setItem("refresh_token", res.data.refresh_token);
  // localStorage.setItem("access_token", res.data.access_token);
  // return jwt_decode(res.data.access_token);
};

export const loginEmail = async (email, password) => {
  const res = await $host.post("/auth/login/email", {
    email,
    password,
  });
  localStorage.setItem("refresh_token", res.data.refresh_token);
  localStorage.setItem("access_token", res.data.access_token);
  return jwt_decode(res.data.access_token);
};

export const checkAuth = async () => {
  const res = await $authHost.get("/auth/token/refresh");
  localStorage.setItem("refresh_token", res.data.refresh_token);
  localStorage.setItem("access_token", res.data.access_token);
  return jwt_decode(res.data.access_token);
};
