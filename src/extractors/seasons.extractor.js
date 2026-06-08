import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

const extractSeasons = async (animeId) => {
  try {
    const url = `${BASE_URL}/api/seasons/${animeId}`;
    const { data } = await axios.get(url, {
      headers: {
        ...headers,
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    return data || [];
  } catch (error) {
    return [];
  }
};

export { extractSeasons };