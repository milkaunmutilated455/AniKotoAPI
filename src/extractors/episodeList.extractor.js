import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS, BASE_URL } from "../configs/dataUrl.js";

const extractEpisodeList = async (slug) => {
  try {
    const infoUrl = URLS.watch(slug);
    const { data: infoData } = await axios.get(infoUrl, { headers });
    const $ = cheerio.load(infoData);

    const animeId = parseInt($("#watch-main").attr("data-id")) || 0;

    if (!animeId) {
      return { animeId: 0, slug, totalEpisodes: 0, episodes: [] };
    }

    try {
      const ajaxUrl = `${BASE_URL}/ajax/episode/list/${animeId}`;
      const { data: ajaxData } = await axios.get(ajaxUrl, {
        headers: {
          ...headers,
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      const $ep = cheerio.load(ajaxData);

      const episodes = [];
      $ep("a[data-num], a[data-ep-id]").each((i, el) => {
        const epId = $ep(el).attr("data-ep-id") || $ep(el).attr("data-id") || "";
        const epNum = parseInt($ep(el).attr("data-num")) || i + 1;
        const epSlug = $ep(el).attr("data-slug") || "";
        const href = $ep(el).attr("href") || "";
        const epTitle = $ep(el).find(".ep-title, .ep-name").text().trim() || "";
        const isActive = $ep(el).hasClass("active") || false;

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
    } catch (ajaxError) {
      return {
        animeId,
        slug,
        totalEpisodes: 0,
        episodes: []
      };
    }
  } catch (error) {
    throw error;
  }
};

export { extractEpisodeList };