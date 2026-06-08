import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";
import { extractPages } from "../helper/extractPages.helper.js";
import { countPages } from "../helper/countPages.helper.js";

const extractSearchResults = async (keyword, page = 1) => {
  try {
    const url = `${URLS.search}?keyword=${encodeURIComponent(keyword)}`;
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
      const genres = [];
      $(el).find(".info .b1 .genre a").each((j, g) => {
        genres.push($(g).text().trim());
      });

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
          rating,
          genres
        });
      }
    });

    return { totalPages, data: results };
  } catch (error) {
    throw error;
  }
};

const extractSearchSuggestions = async (keyword) => {
  try {
    const url = `${URLS.search}?keyword=${encodeURIComponent(keyword)}`;
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const suggestions = [];
    $("#list-items > .item").each((i, el) => {
      const slug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".ani.poster.tip > a > img").attr("src") || "";
      const title = $(el).find(".info .b1 a.name.d-title").text().trim() || "";
      const type = $(el).find(".info .meta .m-item:nth-child(2) label").text().trim() || "";

      if (slug) {
        suggestions.push({ slug, poster, title, type });
      }
    });

    return suggestions.slice(0, 10);
  } catch (error) {
    throw error;
  }
};

export { extractSearchResults, extractSearchSuggestions };