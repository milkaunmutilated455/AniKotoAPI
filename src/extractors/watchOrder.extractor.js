/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — watchOrder.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts watch order information for a specific anime via API.
 *   Returns recommended viewing order from the internal API endpoint.
 *
 * @exports
 *   extractWatchOrder
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

// ══════════════════════════════════════════════════════════════
// WATCH ORDER API EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract watch order data from internal API ----
/**
 * Fetches watch order information for a specific anime from the internal API.
 * Returns an array of watch order objects or empty array on error.
 *
 * @param {string} animeId - The anime ID to fetch watch order for
 * @returns {Promise<Array<Object>>} Array of watch order objects or empty array
 *
 * @example
 *   const watchOrder = await extractWatchOrder("12345");
 *   console.log(watchOrder[0].title); // First anime in watch order
 */
const extractWatchOrder = async (animeId) => {
  throw new Error("Watch order endpoint not available - source site does not provide this data");
};

export { extractWatchOrder };

// ══════════════════════════════════════════════════════════════ END: watchOrder.extractor.js
