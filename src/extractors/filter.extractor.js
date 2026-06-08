import * as cheerio from "cheerio";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";
import { GENRE_IDS, TYPE_IDS, STATUS_IDS, RATING_IDS, SORT_IDS } from "../configs/ids.config.js";
import { countPages } from "../helper/countPages.helper.js";
import { extractPages } from "../helper/extractPages.helper.js";

const extractFilter = async (params) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.keyword) queryParams.set("keyword", params.keyword);

    if (params.genre) {
      const genres = params.genre.split(",").map(g => GENRE_IDS[g.trim().toLowerCase()] || g.trim());
      genres.forEach(g => queryParams.append("genre[]", g));
    }

    if (params.type) {
      const types = params.type.split(",").map(t => TYPE_IDS[t.trim().toLowerCase()] || t.trim());
      types.forEach(t => queryParams.append("term_type[]", t));
    }

    if (params.status) {
      const statuses = params.status.split(",").map(s => STATUS_IDS[s.trim().toLowerCase()] || s.trim());
      statuses.forEach(s => queryParams.append("status[]", s));
    }

    if (params.language) {
      const langs = params.language.split(",");
      langs.forEach(l => queryParams.append("language[]", l.trim()));
    }

    if (params.rating) {
      const ratings = params.rating.split(",").map(r => RATING_IDS[r.trim().toLowerCase()] || r.trim());
      ratings.forEach(r => queryParams.append("rating[]", r));
    }

    if (params.sort) {
      const sort = SORT_IDS[params.sort.trim().toLowerCase()] ?? params.sort;
      if (sort) queryParams.set("sort", sort);
    }

    if (params.season) {
      const seasons = params.season.split(",");
      seasons.forEach(s => queryParams.append("season[]", s.trim()));
    }

    if (params.year) {
      const years = params.year.split(",");
      years.forEach(y => queryParams.append("year[]", y.trim()));
    }

    const url = `${URLS.search}?${queryParams.toString()}`;
    const $ = await extractPages(url, params.page || 1);
    const totalPages = countPages($);

    const results = [];
    $("#list-items .item, .film_list-wrap .flw-item").each((i, el) => {
      const slug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img, .ani.poster img").attr("src") || "";
      const title = $(el).find(".name.d-title").text().trim() || "";
      const japaneseTitle = $(el).find(".name.d-title").attr("data-jp") || "";
      const animeId = $(el).find(".poster").attr("data-tip") || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const total = parseInt($(el).find(".ep-status.total span").text().trim()) || 0;
      const type = $(el).find(".meta .right, .m-item:last-child label").text().trim() || "";
      const rating = $(el).find(".m-item.rated span, .rating").text().trim() || "";
      const genres = [];
      $(el).find(".genre a").each((j, g) => {
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

export { extractFilter };