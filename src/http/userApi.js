import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registrationEmail = async (email, password) => {
  const response = await $host.post("/auth/registration/email/code", {
    email,
    password,
  });
  localStorage.setItem("refresh_token", response.data.refresh_token);
  localStorage.setItem("access_token", response.data.access_token);
  return jwt_decode(response.data.access_token);
};

export const loginEmail = async (email, password) => {
  const response = await $host.post("/auth/login/email", {
    email,
    password,
  });
  localStorage.setItem("refresh_token", response.data.refresh_token);
  localStorage.setItem("access_token", response.data.access_token);
  return jwt_decode(response.data.access_token);
};

export const check = async () => {
  const response = await $authHost.get("/auth/token/refresh");
  localStorage.setItem("refresh_token", response.data.refresh_token);
  localStorage.setItem("access_token", response.data.access_token);
  return jwt_decode(response.data.access_token);
};
