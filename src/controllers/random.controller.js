/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKatoAPI — random.controller.js
 * Repository: https://github.com/Shineii86/AniKatoAPI
 *
 * @description
 *   Controller for random anime recommendation. Returns a single
 *   random anime from the source site. No parameters required.
 *
 * @exports
 *   getRandom - Express route handler for GET /api/random
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import { extractRandom } from "../extractors/random.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

// ══════════════════════════════════════════════════════════════
// CONTROLLER: RANDOM
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Random anime endpoint ----
/**
 * Handles GET /api/random requests. Returns a random anime
 * recommendation from the source site.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON response with random anime
 *
 * @example
 *   GET /api/random
 *   Response: { success: true, results: { title, id, ... } }
 */
const getRandom = async (req, res, next) => {
  try {
    const cacheKey = "random";
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }
    const data = await extractRandom();
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getRandom };

// ══════════════════════════════════════════════════════════════ END: random.controller.js