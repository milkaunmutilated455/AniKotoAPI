import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractAnimeInfo = async (slug) => {
  try {
    const url = URLS.watch(slug);
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const title = $("h1[itemprop='name'].title.d-title").text().trim() || "";
    const japaneseTitle = $("h1[itemprop='name'].title.d-title").attr("data-jp") || "";
    const altNames = $(".names.font-italic").text().trim() || "";
    const poster = $("img[itemprop='image']").attr("src") || "";
    const synopsis = $(".synopsis .content").text().trim() || "";
    const rating = $("#w-rating .score .value").text().trim() || "";
    const ratingValue = $("#w-rating span[itemprop='ratingValue']").text().trim() || "";
    const reviewCount = $("#w-rating span[itemprop='reviewCount']").text().trim() || "";
    const animeId = parseInt($("#watch-main").attr("data-id")) || 0;

    const type = $(".bmeta .meta:first-child > div:nth-child(1) span").text().trim() || "";
    const premiered = $(".bmeta .meta:first-child > div:nth-child(2) span").text().trim() || "";
    const aired = $(".bmeta .meta:first-child > div:nth-child(3) span").text().trim() || "";
    const status = $(".bmeta .meta:first-child > div:nth-child(4) span a").text().trim() || "";
    const malScore = $(".bmeta .meta:nth-child(2) > div:nth-child(1) span").text().trim() || "";
    const duration = $(".bmeta .meta:nth-child(2) > div:nth-child(2) span").text().trim() || "";
    const episodes = $(".bmeta .meta:nth-child(2) > div:nth-child(3) span").text().trim() || "";

    const studios = [];
    $(".bmeta .meta:nth-child(2) > div:nth-child(4) span a[itemprop='director'] span[itemprop='name']").each((i, el) => {
      studios.push($(el).text().trim());
    });

    const producers = [];
    $(".bmeta .meta:nth-child(2) > div:nth-child(5) span a[itemprop='director'] span[itemprop='name']").each((i, el) => {
      producers.push($(el).text().trim());
    });

    const genres = [];
    $(".bmeta .meta:first-child > div:nth-child(5) span a[href*='/genre/']").each((i, el) => {
      genres.push($(el).text().trim());
    });

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