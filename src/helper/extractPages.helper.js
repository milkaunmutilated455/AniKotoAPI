/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — extractPages.helper.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   HTTP client utility for fetching and parsing HTML content from
 *   paginated URLs. Uses axios for HTTP requests and Cheerio for
 *   DOM parsing, with support for page-based pagination.
 *
 * @exports
 *   extractPages
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

// ══════════════════════════════════════════════════════════════
// DEPENDENCIES
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Cheerio HTML parser import ----
/**
 * Cheerio library for server-side DOM manipulation.
 * Used to parse and query HTML content from fetched pages.
 *
 * @type {module:cheerio}
 */
import * as cheerio from "cheerio";

// ---- FEATURE: Axios HTTP client import ----
/**
 * Axios HTTP client for making requests to the source site.
 * Handles redirects, timeouts, and response parsing.
 *
 * @type {module:axios}
 */
import axios from "axios";

// ---- FEATURE: Browser-mimicking headers import ----
/**
 * Pre-configured HTTP headers to mimic browser requests.
 * Imported from header.config.js for consistent usage.
 *
 * @type {Object}
 */
import { headers } from "../configs/header.config.js";

// ══════════════════════════════════════════════════════════════
// PAGE EXTRACTION FUNCTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Fetch and parse paginated URL content ----
/**
 * Fetches HTML content from a URL with optional pagination support.
 * Appends page query parameter for pages > 1 and returns parsed
 * Cheerio instance for DOM querying.
 *
 * @param {string} url - Base URL to fetch (without page parameter)
 * @param {number} [page=1] - Page number to fetch (1-indexed)
 * @returns {Promise<CheerioAPI>} Parsed Cheerio instance of the page
 * @throws {Error} If HTTP request fails or returns non-2xx status
 *
 * @example
 *   // Fetch first page of search results
 *   const $ = await extractPages("https://anikototv.to/filter?keyword=one-piece");
 *
 * @example
 *   // Fetch second page of genre listing
 *   const $ = await extractPages(genreUrl, 2);
 *
 * @note
 *   WARNING: The site may block requests without proper headers.
 *   Always use the imported headers configuration.
 *
 * @note
 *   TIP: Consider implementing retry logic for failed requests
 *   in production environments.
 */
const extractPages = async (url, page = 1) => {
  try {
    const finalUrl = page > 1 ? `${url}?page=${page}` : url;
    const { data } = await axios.get(finalUrl, { headers });
    const $ = cheerio.load(data);
    return $;
  } catch (error) {
    throw error;
  }
};

export { extractPages };
// ══════════════════════════════════════════════════════════════ END: extractPages.helper.js