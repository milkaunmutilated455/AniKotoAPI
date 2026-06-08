import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractTrending = async () => {
  try {
    const { data } = await axios.get(URLS.home, { headers });
    const $ = cheerio.load(data);

    const trending = [];
    $(".trending-list .film-detail, .trending-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const japaneseTitle = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";
      const number = parseInt($(el).find(".number").text().trim()) || i + 1;

      if (id) {
        trending.push({ id, number, poster, title, japaneseTitle });
      }
    });

    return trending;
  } catch (error) {
    throw error;
  }
};

export { extractTrending };