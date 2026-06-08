import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";
import { extractPages } from "../helper/extractPages.helper.js";
import { countPages } from "../helper/countPages.helper.js";

const extractAzList = async (letter = "all", page = 1) => {
  try {
    const url = URLS.azList(letter);
    const $ = await extractPages(url, page);
    const totalPages = countPages($);

    const results = [];
    $(".film_list-wrap .flw-item, .film-detail, .item").each((i, el) => {
      const slug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .name.d-title").text().trim() || "";
      const japaneseTitle = $(el).find(".name.d-title").attr("data-jp") || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const total = parseInt($(el).find(".ep-status.total span").text().trim()) || 0;
      const type = $(el).find(".meta .inner .right, .fdi-item:nth-child(2)").text().trim() || "";
      const rating = $(el).find(".rating, .fdi-item:nth-child(3)").text().trim() || "";

      if (slug) {
        results.push({
          slug,
          poster,
          title,
          japaneseTitle,
          sub,
          dub,
          total,
          type,
          rating
        });
      }
    });

    return { totalPages, letter, data: results };
  } catch (error) {
    throw error;
  }
};

export { extractAzList };