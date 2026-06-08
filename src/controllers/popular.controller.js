/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — popular.controller.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Controller for most popular anime list. Returns paginated list
 *   of the most popular anime from the source site. Supports page
 *   parameter for pagination.
 *
 * @exports
 *   getPopular - Express route handler for GET /api/most-popular
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import { extractPopular } from "../extractors/popular.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

// ══════════════════════════════════════════════════════════════
// CONTROLLER: POPULAR
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Most popular anime endpoint ----
/**
 * Handles GET /api/most-popular requests. Returns paginated list
 * of the most popular anime from the source site.
 *
 * @param {object} req - Express request object
 * @param {number} req.query.page - Page number (default: 1)
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON response with popular anime list
 *
 * @example
 *   GET /api/most-popular?page=2
 *   Response: { success: true, results: { anime, pagination, ... } }
 */
const getPopular = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const cacheKey = `popular_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }
    const data = await extractPopular(page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getPopular };

// ══════════════════════════════════════════════════════════════ END: popular.controller.js