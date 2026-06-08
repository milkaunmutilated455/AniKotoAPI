import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractSuggestions = async (keyword) => {
  try {
    const url = `${URLS.search}?keyword=${encodeURIComponent(keyword)}`;
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const suggestions = [];
    $(".search-suggest .film-detail, .nav-item a").each((i, el) => {
      const id = $(el).attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name, .dynamic-name").text().trim() || "";
      const japaneseTitle = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";
      const showType = $(el).find(".fdi-item:first-child").text().trim() || "";
      const releaseDate = $(el).find(".fdi-item:nth-child(2)").text().trim() || "";

      if (id) {
        suggestions.push({ id, poster, title, japaneseTitle, showType, releaseDate });
      }
    });

    return suggestions;
  } catch (error) {
    throw error;
  }
};

export { extractSuggestions };