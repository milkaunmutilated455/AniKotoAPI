/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKatoAPI — status.extractor.js
 * Repository: https://github.com/Shineii86/AniKatoAPI
 *
 * @description
 *   Extracts anime filtered by status (ongoing, completed, etc.).
 *   Supports pagination for browsing large result sets.
 *
 * @exports
 *   extractStatus
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";
import { extractPages } from "../helper/extractPages.helper.js";
import { countPages } from "../helper/countPages.helper.js";

// ══════════════════════════════════════════════════════════════
// STATUS FILTER EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract anime filtered by status with pagination ----
/**
 * Fetches and parses anime filtered by status (ongoing, completed, etc.).
 * Returns paginated results with total page count.
 *
 * @param {string} status - Status to filter by (e.g., "ongoing", "completed")
 * @param {number} page - Page number to fetch (default: 1)
 * @returns {Promise<Object>} Object containing totalPages, status, and data array
 * @returns {number} return.totalPages - Total number of pages available
 * @returns {string} return.status - The status filter used
 * @returns {Array<Object>} return.data - Array of anime objects
 * @returns {string} return.data[].slug - URL slug for the anime
 * @returns {string} return.data[].poster - Poster image URL
 * @returns {string} return.data[].title - English title
 * @returns {string} return.data[].japaneseTitle - Japanese title
 * @returns {number} return.data[].sub - Subbed episode count
 * @returns {number} return.data[].dub - Dubbed episode count
 * @returns {number} return.data[].total - Total episode count
 * @returns {string} return.data[].type - Anime type (TV, Movie, etc.)
 * @returns {string} return.data[].rating - Anime rating
 *
 * @example
 *   const ongoing = await extractStatus("ongoing", 1);
 *   console.log(ongoing.status); // "ongoing"
 *   console.log(ongoing.data[0].title); // First ongoing anime
 */
const extractStatus = async (status, page = 1) => {
  try {
    // NOTE: URLS.status generates the correct endpoint for the given status
    const url = URLS.status(status);
    const $ = await extractPages(url, page);
    const totalPages = countPages($);

    const results = [];

    // NOTE: Multiple selectors to handle different page layouts
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

      // NOTE: Only include items with valid slugs
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

    return { totalPages, status, data: results };
  } catch (error) {
    throw error;
  }
};

export { extractStatus };

// ══════════════════════════════════════════════════════════════ END: status.extractor.js
