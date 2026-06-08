import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";
import { countPages } from "../helper/countPages.helper.js";
import { extractPages } from "../helper/extractPages.helper.js";

const extractFilter = async (params) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.type) queryParams.set("type", params.type);
    if (params.status) queryParams.set("status", params.status);
    if (params.rated) queryParams.set("rated", params.rated);
    if (params.score) queryParams.set("score", params.score);
    if (params.season) queryParams.set("season", params.season);
    if (params.language) queryParams.set("language", params.language);
    if (params.genres) queryParams.set("genres", params.genres);
    if (params.sort) queryParams.set("sort", params.sort);
    if (params.sy) queryParams.set("sy", params.sy);
    if (params.sm) queryParams.set("sm", params.sm);
    if (params.sd) queryParams.set("sd", params.sd);
    if (params.ey) queryParams.set("ey", params.ey);
    if (params.em) queryParams.set("em", params.em);
    if (params.ed) queryParams.set("ed", params.ed);
    if (params.keyword) queryParams.set("keyword", params.keyword);

    const url = `${BASE_URL}/filter?${queryParams.toString()}`;
    const $ = await extractPages(url, params.page || 1);
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

      if (id) {
        results.push({
          id,
          poster,
          title,
          japaneseTitle,
          tvInfo: { showType, sub, dub, eps }
        });
      }
    });

    return { totalPages, data: results };
  } catch (error) {
    throw error;
  }
};

export { extractFilter };