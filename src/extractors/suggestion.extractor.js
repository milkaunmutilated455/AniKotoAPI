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
      const slug = $(el).attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name, .name").text().trim() || "";
      const type = $(el).find(".fdi-item:first-child").text().trim() || "";

      if (slug) {
        suggestions.push({ slug, poster, title, type });
      }
    });

    return suggestions;
  } catch (error) {
    throw error;
  }
};

export { extractSuggestions };