import * as cheerio from "cheerio";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";
import { countPages } from "../helper/countPages.helper.js";
import { extractPages } from "../helper/extractPages.helper.js";

const extractCategory = async (category, page = 1) => {
  try {
    let url;
    if (category.startsWith("genre/")) {
      url = URLS.genre(category.replace("genre/", ""));
    } else if (category.startsWith("type/")) {
      url = URLS.type(category.replace("type/", ""));
    } else if (category.startsWith("status/")) {
      url = URLS.status(category.replace("status/", ""));
    } else {
      url = `${URLS.home}/${category}`;
    }

    const $ = await extractPages(url, page);
    const totalPages = countPages($);

    const results = [];
    $("#list-items > .item").each((i, el) => {
      const slug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".ani.poster.tip > a > img").attr("src") || "";
      const title = $(el).find(".info .b1 a.name.d-title").text().trim() || "";
      const japaneseTitle = $(el).find(".info .b1 a.name.d-title").attr("data-jp") || "";
      const animeId = $(el).find(".ani.poster.tip").attr("data-tip") || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const total = parseInt($(el).find(".ep-status.total span").text().trim()) || 0;
      const type = $(el).find(".info .meta .m-item:nth-child(2) label").text().trim() || "";
      const rating = $(el).find(".info .meta .m-item.rated span").text().trim() || "";

      if (slug) {
        results.push({
          slug,
          animeId,
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

    return { totalPages, data: results };
  } catch (error) {
    throw error;
  }
};

export { extractCategory };