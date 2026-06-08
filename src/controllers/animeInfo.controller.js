/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKatoAPI — animeInfo.controller.js
 * Repository: https://github.com/Shineii86/AniKatoAPI
 *
 * @description
 *   Controller for anime detail information. Extracts full anime
 *   metadata including title, synopsis, episodes, genres, etc.
 *   Requires an anime slug as query parameter.
 *
 * @exports
 *   getAnimeInfo - Express route handler for GET /api/info
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import { extractAnimeInfo } from "../extractors/animeInfo.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

// ══════════════════════════════════════════════════════════════
// CONTROLLER: ANIME INFO
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Anime detail information endpoint ----
/**
 * Handles GET /api/info requests by extracting detailed anime
 * information from the source site. Requires 'id' query param.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON response with anime details
 *
 * @example
 *   GET /api/info?id=one-piece
 *   Response: { success: true, results: { title, synopsis, ... } }
 *
 * @throws {400} If 'id' query parameter is missing
 */
const getAnimeInfo = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ success: false, message: "Anime slug is required" });
    }
    const cacheKey = `anime_${id}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }
    const data = await extractAnimeInfo(id);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getAnimeInfo };

// ══════════════════════════════════════════════════════════════ END: animeInfo.controller.js