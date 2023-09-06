import axios from "axios";
import { BASE_URL } from "./constants";

const $host = axios.create({
  baseURL: BASE_URL,
});

const $authHost = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$authHost.interceptors.response.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "refresh_token"
  )}`;
  return config;
});

// $authHost.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.result?.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         const res = await axios.get(`${BASE_URL}/auth/token/refresh`, {
//           withCredentials: true,
//         });
//         localStorage.setItem("access_token", res.data.access_token);
//         return $authHost.request(originalRequest);
//       } catch (err) {
//         console.log("Неавторизован");
//       }
//     }
//     throw error;
//   }
// );
export { $host, $authHost };
