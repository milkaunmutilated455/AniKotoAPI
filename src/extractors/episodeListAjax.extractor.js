/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKatoAPI — episodeListAjax.extractor.js
 * Repository: https://github.com/Shineii86/AniKatoAPI
 *
 * @description
 *   Low-level AJAX extractor for fetching raw episode list HTML from
 *   anikototv.to's server-side endpoint. Supports optional style and VRF
 *   query parameters for custom episode list rendering.
 *
 * @exports
 *   extractEpisodeListAjax
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

// ══════════════════════════════════════════════════════════════
// EPISODE LIST AJAX EXTRACTOR
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Fetch raw episode list HTML via AJAX with optional params ----
/**
 * Directly queries the AJAX episode list endpoint for a given anime ID.
 * Returns the raw HTML response from the server — does not parse or
 * transform the data. Use this when you need the raw response or want
 * to apply custom style/VRF parameters.
 *
 * @param {number|string} animeId - The internal anime ID from anikototv.to
 * @param {string} [style=""] - Optional style parameter for episode list rendering
 * @param {string} [vrf=""] - Optional VRF parameter (verification/decryption key)
 * @returns {Promise<string>} Raw HTML response from the AJAX endpoint
 *
 * @example
 *   const rawHtml = await extractEpisodeListAjax(12345);
 *   console.log(rawHtml); // HTML fragment with episode links
 *
 * @example
 *   const rawHtml = await extractEpisodeListAjax(12345, "modern", "abc123");
 */
const extractEpisodeListAjax = async (animeId, style = "", vrf = "") => {
  try {
    let url = `${BASE_URL}/ajax/episode/list/${animeId}`;
    // NOTE: Optional params are appended only if non-empty to avoid trailing ?/&
    const params = [];
    if (style) params.push(`style=${style}`);
    if (vrf) params.push(`vrf=${vrf}`);
    if (params.length) url += `?${params.join("&")}`;

    // NOTE: X-Requested-With header is required — without it the server returns the full page
    const { data } = await axios.get(url, {
      headers: {
        ...headers,
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export { extractEpisodeListAjax };

// ══════════════════════════════════════════════════════════════ END: episodeListAjax.extractor.js
