import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

const extractRandom = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/random`, { 
      headers,
      maxRedirects: 5
    });
    const $ = cheerio.load(data);

    const title = $(".film-name h1, .anisc-detail .film-name").text().trim() || "";
    const japaneseTitle = $(".film-name .alternate-title, .anisc-detail .film-name small").text().trim() || "";
    const poster = $(".film-poster img").attr("src") || "";
    const showType = $(".film-info .row .col1 .item:first-child .name").text().trim() || "";

    const animeInfo = {};
    $(".anisc-info .item").each((i, el) => {
      const label = $(el).find(".name").text().trim().replace(":", "");
      const value = $(el).find(".text").text().trim();
      if (label && value) {
        animeInfo[label] = value;
      }
    });

    return {
      title,
      japaneseTitle,
      poster,
      showType,
      animeInfo
    };
  } catch (error) {
    throw error;
  }
};

export { extractRandom };