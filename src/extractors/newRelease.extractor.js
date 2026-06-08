/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — newRelease.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts newly released and newly added anime with pagination.
 *   Provides both new releases and sorted by addition date.
 *
 * @exports
 *   extractNewRelease
 *   extractNewlyAdded
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
// NEW RELEASE EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract newly released anime with pagination ----
/**
 * Fetches and parses newly released anime with pagination.
 * Returns paginated results with total page count.
 *
 * @param {number} page - Page number to fetch (default: 1)
 * @returns {Promise<Object>} Object containing totalPages and data array
 * @returns {number} return.totalPages - Total number of pages available
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
 *   const newRelease = await extractNewRelease(1);
 *   console.log(newRelease.totalPages);
 *   console.log(newRelease.data[0].title);
 */
const extractNewRelease = async (page = 1) => {
  try {
    // NOTE: extractPages handles pagination and returns parsed Cheerio object
    const $ = await extractPages(URLS.newRelease, page);
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

    return { totalPages, data: results };
  } catch (error) {
    throw error;
  }
};

// ══════════════════════════════════════════════════════════════
// NEWLY ADDED EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract newly added anime sorted by addition date ----
/**
 * Fetches and parses newly added anime sorted by addition date.
 * Uses the latestUpdated endpoint with sort=added parameter.
 *
 * @param {number} page - Page number to fetch (default: 1)
 * @returns {Promise<Object>} Object containing totalPages and data array
 * @returns {number} return.totalPages - Total number of pages available
 * @returns {Array<Object>} return.data - Array of anime objects
 * @returns {string} return.data[].slug - URL slug for the anime
 * @returns {string} return.data[].poster - Poster image URL
 * @returns {string} return.data[].title - English title
 * @returns {string} return.data[].japaneseTitle - Japanese title
 * @returns {number} return.data[].sub - Subbed episode count
 * @returns {number} return.data[].dub - Dubbed episode count
 * @returns {number} return.data[].total - Total episode count
 * @returns {string} return.data[].type - Anime type (TV, Movie, etc.)
 *
 * @example
 *   const newlyAdded = await extractNewlyAdded(1);
 *   console.log(newlyAdded.totalPages);
 *   console.log(newlyAdded.data[0].title);
 */
const extractNewlyAdded = async (page = 1) => {
  try {
    // NOTE: The latestUpdated endpoint with sort=added returns recently added anime
    const $ = await extractPages(`${URLS.latestUpdated}?sort=added`, page);
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
          type
        });
      }
    });

    return { totalPages, data: results };
  } catch (error) {
    throw error;
  }
};

export { extractNewRelease, extractNewlyAdded };

// ══════════════════════════════════════════════════════════════ END: newRelease.extractor.js
