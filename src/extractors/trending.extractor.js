/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — trending.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts trending and recently updated anime from the homepage.
 *   Scrapes both the updated section and recent updates section.
 *
 * @exports
 *   extractTrending
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
// TRENDING EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract trending and recently updated anime ----
/**
 * Fetches and parses trending anime from the homepage.
 * Combines results from both the updated section and recent updates section.
 *
 * @returns {Promise<Array<Object>>} Array of trending anime objects
 * @returns {string} return.slug - URL slug for the anime
 * @returns {string} return.poster - Poster image URL
 * @returns {string} return.title - English title
 * @returns {string} return.japaneseTitle - Japanese title
 * @returns {number} return.sub - Subbed episode count
 * @returns {number} return.dub - Dubbed episode count
 * @returns {number} return.total - Total episode count
 * @returns {string} return.type - Anime type (TV, Movie, etc.)
 *
 * @example
 *   const trending = await extractTrending();
 *   console.log(trending[0].title);
 */
const extractTrending = async () => {
  try {
    // NOTE: Trending data is split across multiple sections on the homepage
    const { data } = await axios.get(URLS.home, { headers });
    const $ = cheerio.load(data);

    const trending = [];

    // NOTE: This selector targets both the updated section and recent updates
    $(".section-updated .item, #recent-update .item").each((i, el) => {
      const slug = $(el).find("a.name.d-title").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const title = $(el).find("a.name.d-title").text().trim() || "";
      const japaneseTitle = $(el).find("a.name.d-title").attr("data-jp") || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const total = parseInt($(el).find(".ep-status.total span").text().trim()) || 0;
      const type = $(el).find(".meta .inner .right").text().trim() || "";

      // NOTE: Only include items with valid slugs
      if (slug) {
        trending.push({
          slug,
          poster,
          title,
          japaneseTitle,
          sub,
          dub,
          total,
          type
        });
      }
    });

    return trending;
  } catch (error) {
    throw error;
  }
};

export { extractTrending };

// ══════════════════════════════════════════════════════════════ END: trending.extractor.js
