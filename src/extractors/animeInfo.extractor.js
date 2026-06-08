/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKatoAPI — animeInfo.extractor.js
 * Repository: https://github.com/Shineii86/AniKatoAPI
 *
 * @description
 *   Extracts detailed anime information from anikototv.to including title,
 *   synopsis, metadata (type, status, studios, producers, genres), ratings,
 *   and background artwork for a given anime slug.
 *
 * @exports
 *   extractAnimeInfo
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

// ══════════════════════════════════════════════════════════════
// ANIME INFO EXTRACTOR
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract full anime detail page data for a given slug ----
/**
 * Fetches the anime detail page from anikototv.to and parses all metadata
 * including titles, synopsis, ratings, studios, producers, genres, and
 * background artwork.
 *
 * @param {string} slug - The anime slug identifier (e.g. "naruto-shippuden")
 * @returns {Promise<Object>} Full anime info object with all extracted fields
 *
 * @example
 *   const info = await extractAnimeInfo("one-piece");
 *   console.log(info.title);   // "One Piece"
 *   console.log(info.studios); // ["Toei Animation"]
 */
const extractAnimeInfo = async (slug) => {
  try {
    const url = URLS.watch(slug);
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    // ---- FEATURE: Extract title and identification fields ----
    // NOTE: itemprop='name' is used for schema.org microdata on the site
    const title = $("h1[itemprop='name'].title.d-title").text().trim() || "";
    // NOTE: data-jp attribute holds the Japanese title variant
    const japaneseTitle = $("h1[itemprop='name'].title.d-title").attr("data-jp") || "";
    const altNames = $(".names.font-italic").text().trim() || "";
    const poster = $("img[itemprop='image']").attr("src") || "";
    const synopsis = $(".synopsis .content").text().trim() || "";

    // ---- FEATURE: Extract rating and review metadata ----
    // NOTE: Multiple rating selectors are checked — .score .value is the display score,
    //       itemprop='ratingValue' is the microdata fallback
    const rating = $("#w-rating .score .value").text().trim() || "";
    const ratingValue = $("#w-rating span[itemprop='ratingValue']").text().trim() || "";
    const reviewCount = $("#w-rating span[itemprop='reviewCount']").text().trim() || "";
    // NOTE: data-id on #watch-main is the internal anime ID used for AJAX calls
    const animeId = parseInt($("#watch-main").attr("data-id")) || 0;

    // ---- FEATURE: Extract anime metadata (type, premiere, aired, status) ----
    // NOTE: .bmeta contains the structured metadata block — first child holds basic info
    const type = $(".bmeta .meta:first-child > div:nth-child(1) span").text().trim() || "";
    const premiered = $(".bmeta .meta:first-child > div:nth-child(2) span").text().trim() || "";
    const aired = $(".bmeta .meta:first-child > div:nth-child(3) span").text().trim() || "";
    const status = $(".bmeta .meta:first-child > div:nth-child(4) span a").text().trim() || "";

    // ---- FEATURE: Extract secondary metadata (MAL score, duration, episodes) ----
    // NOTE: Second .meta child holds MAL-linked and production metadata
    const malScore = $(".bmeta .meta:nth-child(2) > div:nth-child(1) span").text().trim() || "";
    const duration = $(".bmeta .meta:nth-child(2) > div:nth-child(2) span").text().trim() || "";
    const episodes = $(".bmeta .meta:nth-child(2) > div:nth-child(3) span").text().trim() || "";

    // ---- FEATURE: Extract studios list ----
    // NOTE: itemprop='director' links on studio spans — itemprop='name' inside holds the name
    const studios = [];
    $(".bmeta .meta:nth-child(2) > div:nth-child(4) span a[itemprop='director'] span[itemprop='name']").each((i, el) => {
      studios.push($(el).text().trim());
    });

    // ---- FEATURE: Extract producers list ----
    // NOTE: Same selector pattern as studios but from the 5th child (producers row)
    const producers = [];
    $(".bmeta .meta:nth-child(2) > div:nth-child(5) span a[itemprop='director'] span[itemprop='name']").each((i, el) => {
      producers.push($(el).text().trim());
    });

    // ---- FEATURE: Extract genres ----
    // NOTE: Genre links contain '/genre/' in their href — filters out non-genre links
    const genres = [];
    $(".bmeta .meta:first-child > div:nth-child(5) span a[href*='/genre/']").each((i, el) => {
      genres.push($(el).text().trim());
    });

    // ---- FEATURE: Extract background artwork from player element ----
    // NOTE: The #player div has a CSS background-image set via inline style
    const backgroundImage = $("#player").css("background-image")?.match(/url\(['"]?(.+?)['"]?\)/)?.[1] || "";

    return {
      slug,
      animeId,
      title,
      japaneseTitle,
      altNames,
      poster,
      backgroundImage,
      synopsis,
      type,
      premiered,
      aired,
      status,
      malScore,
      duration,
      episodes,
      studios,
      producers,
      genres,
      rating: rating || ratingValue,
      reviewCount
    };
  } catch (error) {
    throw error;
  }
};

export { extractAnimeInfo };

// ══════════════════════════════════════════════════════════════ END: animeInfo.extractor.js
