import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractAnimeInfo = async (slug) => {
  try {
    const url = URLS.watch(slug);
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const title = $(".anisc-detail .film-name, .film-name h1").text().trim() || "";
    const japaneseTitle = $(".anisc-detail .film-name .alternate-title, .film-name small").text().trim() || "";
    const poster = $(".film-poster img, .anisc-poster img").attr("src") || "";
    const type = $(".film-info .row .col1 .item:first-child .name").text().trim() || "";
    const rating = $(".film-info .row .col1 .item:nth-child(2) .name").text().trim() || "";
    const quality = $(".film-info .row .col1 .item:nth-child(3) .name").text().trim() || "";

    const animeInfo = {};
    $(".anisc-info .item").each((i, el) => {
      const label = $(el).find(".name").text().trim().replace(":", "");
      const value = $(el).find(".text").text().trim();
      if (label && value) {
        animeInfo[label] = value;
      }
    });

    const overview = $(".anisc-detail .description, .film-description .text").text().trim() || "";

    const genres = [];
    $(".anisc-info .item:last-child a, .genres a").each((i, el) => {
      const genre = $(el).text().trim();
      if (genre) genres.push(genre);
    });

    const episodes = [];
    $(".episodes-list .ep-item, .ss-list a").each((i, el) => {
      const epId = $(el).attr("data-id") || $(el).attr("href")?.split("/").pop() || "";
      const epNumber = parseInt($(el).find(".ep-number, .ep-num").text().trim()) || i + 1;
      const title = $(el).find(".ep-title, .ep-name").text().trim() || "";

      if (epId) {
        episodes.push({
          id: epId,
          episode_no: epNumber,
          title
        });
      }
    });

    const relatedData = [];
    $(".related-content .film-detail, .film-list-block .film-detail").each((i, el) => {
      const relSlug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const relPoster = $(el).find("img").attr("src") || "";
      const relTitle = $(el).find(".film-name a").text().trim() || "";

      if (relSlug) {
        relatedData.push({
          slug: relSlug,
          poster: relPoster,
          title: relTitle
        });
      }
    });

    const recommendedData = [];
    $(".recommend-content .film-detail, .film-list-block .film-detail").each((i, el) => {
      const recSlug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const recPoster = $(el).find("img").attr("src") || "";
      const recTitle = $(el).find(".film-name a").text().trim() || "";

      if (recSlug) {
        recommendedData.push({
          slug: recSlug,
          poster: recPoster,
          title: recTitle
        });
      }
    });

    return {
      slug,
      title,
      japaneseTitle,
      poster,
      type,
      rating,
      quality,
      overview,
      animeInfo,
      genres,
      episodes,
      relatedData,
      recommendedData
    };
  } catch (error) {
    throw error;
  }
};

export { extractAnimeInfo };