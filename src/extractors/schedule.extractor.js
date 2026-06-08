import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractSchedule = async (date) => {
  try {
    const url = `${URLS.home}?date=${date}`;
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const schedule = [];
    $(".schedule-item, .anime-schedule .item").each((i, el) => {
      const slug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const title = $(el).find(".film-name a, .name").text().trim() || "";
      const time = $(el).find(".time, .schedule-time").text().trim() || "";
      const episodeNo = parseInt($(el).find(".episode-no, .ep-num").text().trim()) || 0;

      if (slug) {
        schedule.push({
          slug,
          title,
          time,
          episode_no: episodeNo
        });
      }
    });

    return schedule;
  } catch (error) {
    throw error;
  }
};

export { extractSchedule };