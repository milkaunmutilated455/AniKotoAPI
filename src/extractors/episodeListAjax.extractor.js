import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

const extractEpisodeListAjax = async (animeId, style = "", vrf = "") => {
  try {
    let url = `${BASE_URL}/ajax/episode/list/${animeId}`;
    const params = [];
    if (style) params.push(`style=${style}`);
    if (vrf) params.push(`vrf=${vrf}`);
    if (params.length) url += `?${params.join("&")}`;

    const { data } = await axios.get(url, {
      headers: {
        ...headers,
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export { extractEpisodeListAjax };