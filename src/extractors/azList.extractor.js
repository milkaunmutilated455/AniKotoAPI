/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — azList.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts anime from A-Z listing pages with pagination.
 *   Supports filtering by letter (a-z) or "all" for complete list.
 *
 * @exports
 *   extractAzList
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
// A-Z LIST EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract anime from A-Z listing with pagination ----
/**
 * Fetches and parses anime from the A-Z listing page.
 * Supports filtering by letter (a-z) or "all" for complete list.
 *
 * @param {string} letter - Letter to filter by (a-z) or "all" (default: "all")
 * @param {number} page - Page number to fetch (default: 1)
 * @returns {Promise<Object>} Object containing totalPages, letter, and data array
 * @returns {number} return.totalPages - Total number of pages available
 * @returns {string} return.letter - The letter filter used
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
 *   const azList = await extractAzList("a", 1);
 *   console.log(azList.letter); // "a"
 *   console.log(azList.data[0].title); // First anime starting with "a"
 */
const extractAzList = async (letter = "all", page = 1) => {
  try {
    // NOTE: URLS.azList generates the correct endpoint for the given letter
    const url = URLS.azList(letter);
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

    return { totalPages, letter, data: results };
  } catch (error) {
    throw error;
  }
};

export { extractAzList };

// ══════════════════════════════════════════════════════════════ END: azList.extractor.js
