import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractEpisodeList = async (slug) => {
  try {
    const url = URLS.watch(slug);
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const episodes = [];
    $(".episodes-list .ep-item, .ss-list a").each((i, el) => {
      const epId = $(el).attr("data-id") || $(el).attr("href")?.split("/ep-").pop() || "";
      const epNumber = parseInt($(el).find(".ep-number, .ep-num").text().trim()) || i + 1;
      const title = $(el).find(".ep-title, .ep-name").text().trim() || "";
      const filler = $(el).hasClass("filler") || false;

      if (epId) {
        episodes.push({
          id: epId,
          episode_no: epNumber,
          title,
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