import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractEpisodeList = async (slug) => {
  try {
    const url = URLS.watch(slug);
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const animeId = parseInt($("#watch-main").attr("data-id")) || 0;

    const episodes = [];
    $("#w-episodes a[data-num], #w-episodes a[data-slug]").each((i, el) => {
      const epId = $(el).attr("data-id") || $(el).attr("data-ep-id") || "";
      const epNum = parseInt($(el).attr("data-num")) || i + 1;
      const epSlug = $(el).attr("data-slug") || "";
      const epTitle = $(el).find(".ep-title, .ep-name").text().trim() || "";
      const isActive = $(el).hasClass("active") || false;
      const href = $(el).attr("href") || "";

      episodes.push({
        id: epId,
        episode_no: epNum,
        slug: epSlug,
        title: epTitle,
        active: isActive,
        href
      });
    });

    return {
      animeId,
      slug,
      totalEpisodes: episodes.length,
      episodes
    };
  } catch (error) {
    throw error;
  }
};

export { extractEpisodeList };