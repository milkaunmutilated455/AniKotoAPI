import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractSchedule = async (date) => {
  try {
    const url = URLS.schedule(date);
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const schedule = [];
    $(".schedule-item, .anime-schedule .item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const japaneseTitle = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";
      const time = $(el).find(".time, .schedule-time").text().trim() || "";
      const episodeNo = parseInt($(el).find(".episode-no, .ep-num").text().trim()) || 0;
      const releaseDate = $(el).find(".date, .release-date").text().trim() || "";

      if (id) {
        schedule.push({
          id,
          title,
          japaneseTitle,
          time,
          episode_no: episodeNo,
          releaseDate
        });
      }
    });

    return schedule;
  } catch (error) {
    throw error;
  }
};

export { extractSchedule };