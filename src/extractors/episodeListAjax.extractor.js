/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — episodeListAjax.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
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

import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

// ══════════════════════════════════════════════════════════════
// EPISODE LIST AJAX EXTRACTOR
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Fetch and parse episode list HTML via AJAX ----
/**
 * Queries the AJAX episode list endpoint for a given anime ID.
 * Parses the HTML response and returns structured episode data
 * with server IDs, timestamps, and MAL IDs.
 *
 * @param {number|string} animeId - The internal anime ID from anikototv.to
 * @param {string} [style=""] - Optional style parameter for episode list rendering
 * @param {string} [vrf=""] - Optional VRF parameter (verification/decryption key)
 * @returns {Promise<Object>} Parsed episode data with filters, ranges, and episodes array
 *
 * @example
 *   const data = await extractEpisodeListAjax(7457);
 *   console.log(data.episodes[0].server_ids); // base64-encoded server IDs
 */
const extractEpisodeListAjax = async (animeId, style = "", vrf = "") => {
  try {
    let url = `${BASE_URL}/ajax/episode/list/${animeId}`;
    const params = [];
    if (style) params.push(`style=${style}`);
    if (vrf) params.push(`vrf=${vrf}`);
    if (params.length) url += `?${params.join("&")}`;

    const { data: raw } = await axios.get(url, {
      headers: {
        ...headers,
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    // NOTE: Response is JSON {status, result} where result is HTML
    const html = typeof raw === "string" ? raw : (raw?.result || "");
    const $ = cheerio.load(html);

    // NOTE: Extract filter options (Sub/Dub, episode ranges)
    const filters = [];
    $(".dropdown.filter").each((_, el) => {
      const filterName = $(el).find("button").text().trim();
      const options = [];
      $(el).find(".dropdown-item").each((__, item) => {
        options.push({
          value: $(item).attr("data-value") || "",
          label: $(item).text().trim()
        });
      });
      filters.push({ name: filterName, options });
    });

    // NOTE: Extract episode ranges
    const ranges = [];
    $(".ep-range").each((_, el) => {
      ranges.push($(el).attr("data-range") || "");
    });

    // NOTE: Parse episodes from list items
    const episodes = [];
    $("li[data-html]").each((_, li) => {
      const a = $(li).find("a").first();
      if (!a.length) return;

      const title = $(li).attr("title") || "";
      const jpTitle = a.find(".d-title").attr("data-jp") || "";

      episodes.push({
        id: a.attr("data-id") || "",
        episode_no: parseInt(a.attr("data-num")) || 0,
        slug: a.attr("data-slug") || "",
        title,
        jp_title: jpTitle,
        mal_id: a.attr("data-mal") || "",
        timestamp: a.attr("data-timestamp") || "",
        has_sub: a.attr("data-sub") === "1",
        has_dub: a.attr("data-dub") === "1",
        server_ids: a.attr("data-ids") || "",
        active: a.hasClass("active") || false
      });
    });

    return {
      animeId,
      filters,
      ranges,
      totalEpisodes: episodes.length,
      episodes
    };
  } catch (error) {
    throw error;
  }
};

export { extractEpisodeListAjax };

// ══════════════════════════════════════════════════════════════ END: episodeListAjax.extractor.js
