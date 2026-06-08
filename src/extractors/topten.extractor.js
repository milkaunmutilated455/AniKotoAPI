/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKatoAPI — topten.extractor.js
 * Repository: https://github.com/Shineii86/AniKatoAPI
 *
 * @description
 *   Extracts top 10 anime rankings from the homepage.
 *   Parses daily, weekly, and monthly top anime lists.
 *
 * @exports
 *   extractTopTen
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

// ══════════════════════════════════════════════════════════════
// TOP TEN EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract daily, weekly, and monthly top 10 anime ----
/**
 * Fetches and parses the top 10 anime rankings from the homepage.
 * Returns three arrays: today, week, and month rankings.
 *
 * @returns {Promise<Object>} Object containing today, week, and month arrays
 * @returns {Array<Object>} return.today - Daily top 10 anime
 * @returns {Array<Object>} return.week - Weekly top 10 anime
 * @returns {Array<Object>} return.month - Monthly top 10 anime
 * @returns {string} return.today[].slug - URL slug for the anime
 * @returns {number} return.today[].rank - Ranking position (1-10)
 * @returns {string} return.today[].name - Anime name
 * @returns {string} return.today[].poster - Poster image URL
 * @returns {number} return.today[].sub - Subbed episode count
 * @returns {number} return.today[].dub - Dubbed episode count
 * @returns {string} return.today[].type - Anime type (TV, Movie, etc.)
 *
 * @example
 *   const topTen = await extractTopTen();
 *   console.log(topTen.today[0].name); // #1 anime today
 */
const extractTopTen = async () => {
  try {
    // NOTE: The top 10 section uses tabbed content with data-name attributes
    const { data } = await axios.get(URLS.home, { headers });
    const $ = cheerio.load(data);

    const today = [];
    const week = [];
    const month = [];

    // NOTE: Each tab contains a list of anime items with ranking data
    $("#top-anime .tab-content[data-name='day'] a.item").each((i, el) => {
      const slug = $(el).attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const name = $(el).find(".name").text().trim() || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const type = $(el).find(".type").text().trim() || "";
      const rank = i + 1;

      // NOTE: Only include items with valid slugs
      if (slug) {
        today.push({ slug, rank, name, poster, sub, dub, type });
      }
    });

    // NOTE: Weekly rankings follow the same structure as daily
    $("#top-anime .tab-content[data-name='week'] a.item").each((i, el) => {
      const slug = $(el).attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const name = $(el).find(".name").text().trim() || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const type = $(el).find(".type").text().trim() || "";
      const rank = i + 1;

      if (slug) {
        week.push({ slug, rank, name, poster, sub, dub, type });
      }
    });

    // NOTE: Monthly rankings follow the same structure
    $("#top-anime .tab-content[data-name='month'] a.item").each((i, el) => {
      const slug = $(el).attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const name = $(el).find(".name").text().trim() || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const type = $(el).find(".type").text().trim() || "";
      const rank = i + 1;

      if (slug) {
        month.push({ slug, rank, name, poster, sub, dub, type });
      }
    });

    return { today, week, month };
  } catch (error) {
    throw error;
  }
};

export { extractTopTen };

// ══════════════════════════════════════════════════════════════ END: topten.extractor.js
