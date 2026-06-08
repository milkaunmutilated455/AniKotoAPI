import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractTopTen = async () => {
  try {
    const { data } = await axios.get(URLS.topTen, { headers });
    const $ = cheerio.load(data);

    const today = [];
    const week = [];
    const month = [];

    $(".top-ten-list.today .top-ten-item, #top-viewed-day .top-list-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const name = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const number = parseInt($(el).find(".number").text().trim()) || i + 1;
      const showType = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";

      if (id) {
        today.push({ id, number, name, poster, tvInfo: { showType } });
      }
    });

    $(".top-ten-list.week .top-ten-item, #top-viewed-week .top-list-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const name = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const number = parseInt($(el).find(".number").text().trim()) || i + 1;
      const showType = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";

      if (id) {
        week.push({ id, number, name, poster, tvInfo: { showType } });
      }
    });

    $(".top-ten-list.month .top-ten-item, #top-viewed-month .top-list-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const name = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const number = parseInt($(el).find(".number").text().trim()) || i + 1;
      const showType = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";

      if (id) {
        month.push({ id, number, name, poster, tvInfo: { showType } });
      }
    });

    return { today, week, month };
  } catch (error) {
    throw error;
  }
};

export { extractTopTen };