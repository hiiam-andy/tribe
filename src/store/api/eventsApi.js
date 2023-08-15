import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default class GetEvents {
  static async getOneEvent(id) {
    try {
      const res = await axios.get(`${BASE_URL}/events/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
