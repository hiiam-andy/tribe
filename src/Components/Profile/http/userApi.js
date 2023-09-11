import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

//Проверить не занят ли емейл
export const checkEmail = async (email) => {
  try {
    const res = await axios.get(`${BASE_URL}/user/email/check/${email}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//проверить существует ли пользователь с юзернейм
export const checkUsername = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/user/username/check/${username}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//Удалить аккаунт
export const deleteAccount = async (user_id) => {
  try {
    await axios.delete(`${BASE_URL}/user/delete/${user_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

//Подписаться на пользователя
export const subscribeToUser = async (follower_user_id, following_user_id) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user/subscribe`,
      {
        follower_user_id,
        following_user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
