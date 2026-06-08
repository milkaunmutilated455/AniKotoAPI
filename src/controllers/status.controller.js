/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — status.controller.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Controller for anime filtering by airing status. Returns anime
 *   filtered by their current airing status (currently-airing,
 *   finished-airing, not-yet-aired) with pagination support.
 *
 * @exports
 *   getStatus - Express route handler for GET /api/status/:status
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import { extractStatus } from "../extractors/status.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

// ══════════════════════════════════════════════════════════════
// CONTROLLER: STATUS
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Anime by airing status endpoint ----
/**
 * Handles GET /api/status/:status requests. Returns paginated
 * anime list filtered by their airing status.
 *
 * @param {object} req - Express request object
 * @param {string} req.params.status - Airing status filter
 * @param {number} req.query.page - Page number (default: 1)
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON response with filtered anime list
 *
 * @example
 *   GET /api/status/currently-airing?page=2
 *   Response: { success: true, results: { anime, pagination, ... } }
 *
 * @throws {400} If status parameter is invalid
 * NOTE: Valid statuses: "currently-airing", "finished-airing", "not-yet-aired"
 */
const getStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const { page = 1 } = req.query;
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required (currently-airing, finished-airing, not-yet-aired)" });
    }
    const cacheKey = `status_${status}_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }
    const data = await extractStatus(status, page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getStatus };

// ══════════════════════════════════════════════════════════════ END: status.controller.js