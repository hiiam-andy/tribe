import PageAuth from "../Pages/PageAuth";

export const authRoutes = [{}];

export const publicRoutes = [{}];

//Регистрация
const registrationRoutes = [
  { path: "/auth/registration/:method/:action", element: PageAuth },
];

//Логин
const loginRoutes = [
  { path: "/auth/login/:method/:socials/:action", element: PageAuth },
];

export const USER_ROUTE = "/user";
export const AUTH_ROUTE = "/auth";

export const LOGIN_ROUTE = "auth/login";
export const REGISTRATION_ROUTE = "auth/registration";

export const MAIN_ROUTE = "/main";
export const FAVORITES_ROUTE = "/favorite";
export const EVENTS_ROUTE = "/events";
export const PROFILE_ROUTE = "/profile";
export const CHAT_ROUTE = "/chat";
export const SETTINGS_ROUTE = "/settings";
export const EVENT_ROUTE = "/events/:id";

export const RootRoute = { registrationRoutes, loginRoutes };
