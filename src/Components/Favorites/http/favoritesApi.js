import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

const token = localStorage.getItem("access_token");

export const addToFavorite = async (user_id, event_id) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/events/favorite`,
      {
        user_id,
        event_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
};
