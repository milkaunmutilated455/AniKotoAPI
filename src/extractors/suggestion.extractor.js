/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKatoAPI — suggestion.extractor.js
 * Repository: https://github.com/Shineii86/AniKatoAPI
 *
 * @description
 *   Extracts search suggestions/autocomplete results for a keyword.
 *   Returns up to 10 matching anime suggestions.
 *
 * @exports
 *   extractSuggestions
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
// SUGGESTION EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract search suggestions for a keyword ----
/**
 * Fetches and parses search suggestions for a given keyword.
 * Returns up to 10 matching anime suggestions.
 *
 * @param {string} keyword - Search keyword to get suggestions for
 * @returns {Promise<Array<Object>>} Array of suggestion objects (max 10)
 * @returns {string} return.slug - URL slug for the anime
 * @returns {string} return.poster - Poster image URL
 * @returns {string} return.title - English title
 * @returns {string} return.japaneseTitle - Japanese title
 * @returns {string} return.type - Anime type (TV, Movie, etc.)
 * @returns {number} return.sub - Subbed episode count
 * @returns {number} return.dub - Dubbed episode count
 *
 * @example
 *   const suggestions = await extractSuggestions("naruto");
 *   console.log(suggestions.length); // Up to 10 results
 *   console.log(suggestions[0].title);
 */
const extractSuggestions = async (keyword) => {
  try {
    // NOTE: The search endpoint requires the 'keyword' parameter
    const url = `${URLS.search}?keyword=${encodeURIComponent(keyword)}`;
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const suggestions = [];

    // NOTE: Search results use the same list structure as other pages
    $("#list-items > .item").each((i, el) => {
      const slug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".ani.poster.tip > a > img").attr("src") || "";
      const title = $(el).find(".info .b1 a.name.d-title").text().trim() || "";
      const japaneseTitle = $(el).find(".info .b1 a.name.d-title").attr("data-jp") || "";
      const type = $(el).find(".info .meta .m-item:nth-child(2) label").text().trim() || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;

      // NOTE: Only include items with valid slugs
      if (slug) {
        suggestions.push({ slug, poster, title, japaneseTitle, type, sub, dub });
      }
    });

    // NOTE: Limit to 10 suggestions for autocomplete-style responses
    return suggestions.slice(0, 10);
  } catch (error) {
    throw error;
  }
};

export { extractSuggestions };

// ══════════════════════════════════════════════════════════════ END: suggestion.extractor.js
