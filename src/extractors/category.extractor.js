import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";
import { countPages } from "../helper/countPages.helper.js";
import { extractPages } from "../helper/extractPages.helper.js";

const extractCategory = async (category, page = 1) => {
  try {
    const url = URLS.category(category);
    const $ = await extractPages(url, page);
    const totalPages = countPages($);

    const results = [];
    $(".film_list-wrap .flw-item, .film-detail").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const japaneseTitle = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";
      const showType = $(el).find(".fd-infor .fdi-item:nth-child(2)").text().trim() || "";
      const sub = parseInt($(el).find(".tick-sub").text().trim()) || 0;
      const dub = parseInt($(el).find(".tick-dub").text().trim()) || 0;
      const eps = parseInt($(el).find(".tick-eps").text().trim()) || 0;
      const adultContent = $(el).find(".tick-adult, .adult-badge").length > 0;

      if (id) {
        results.push({
          id,
          poster,
          title,
          japaneseTitle,
          tvInfo: { showType, sub, dub, eps },
          adultContent
        });
      }
    });

    return { totalPages, data: results };
  } catch (error) {
    throw error;
  }
};

export { extractCategory };