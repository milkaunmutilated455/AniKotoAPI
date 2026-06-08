import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

const extractEpisodeList = async (id) => {
  try {
    const url = `${BASE_URL}/anime/${id}`;
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const episodes = [];
    $(".episodes-list .ep-item, .ss-list a").each((i, el) => {
      const epId = $(el).attr("data-id") || $(el).attr("href")?.split("/").pop() || "";
      const epNumber = parseInt($(el).find(".ep-number, .ep-num").text().trim()) || i + 1;
      const title = $(el).find(".ep-title, .ep-name").text().trim() || "";
      const japaneseTitle = $(el).find(".ep-jp").text().trim() || "";
      const filler = $(el).hasClass("filler") || false;

      if (epId) {
        episodes.push({
          id: epId,
          episode_no: epNumber,
          title,
          japaneseTitle,
          filler
        });
      }
    });

    return {
      totalEpisodes: episodes.length,
      episodes
    };
  } catch (error) {
    throw error;
  }
};

export { extractEpisodeList };