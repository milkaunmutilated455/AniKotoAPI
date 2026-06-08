/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — azList.controller.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Controller for alphabetical anime listing. Returns anime
 *   filtered by starting letter with pagination support.
 *   Default letter is 'all' if not specified.
 *
 * @exports
 *   getAzList - Express route handler for GET /api/az-list/:letter
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import { extractAzList } from "../extractors/azList.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

// ══════════════════════════════════════════════════════════════
// CONTROLLER: A-Z LIST
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Alphabetical anime listing endpoint ----
/**
 * Handles GET /api/az-list/:letter requests. Returns paginated
 * anime list filtered by the starting letter.
 *
 * @param {object} req - Express request object
 * @param {string} req.params.letter - Starting letter (default: "all")
 * @param {number} req.query.page - Page number (default: 1)
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON response with alphabetical anime list
 *
 * @example
 *   GET /api/az-list/A?page=2
 *   Response: { success: true, results: { anime, pagination, ... } }
 *
 * NOTE: Use 'all' as letter to get all anime without letter filtering
 */
const getAzList = async (req, res, next) => {
  try {
    const { letter = "all" } = req.params;
    const { page = 1 } = req.query;
    const cacheKey = `azlist_${letter}_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }
    const data = await extractAzList(letter, page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getAzList };

// ══════════════════════════════════════════════════════════════ END: azList.controller.js