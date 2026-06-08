import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractRandom = async () => {
  try {
    const { data, request, response } = await axios.get(URLS.random, {
      headers,
      maxRedirects: 5,
      validateStatus: (status) => status < 400
    });

    const finalUrl = request?.responseURL || URLS.random;
    const slug = finalUrl.split("/watch/").pop() || "";

    const $ = cheerio.load(data);

    const title = $("h1[itemprop='name'].title.d-title").text().trim() || "";
    const japaneseTitle = $("h1[itemprop='name'].title.d-title").attr("data-jp") || "";
    const poster = $("img[itemprop='image']").attr("src") || "";
    const type = $(".bmeta .meta:first-child > div:nth-child(1) span").text().trim() || "";
    const synopsis = $(".synopsis .content").text().trim() || "";
    const rating = $("#w-rating .score .value").text().trim() || "";
    const animeId = parseInt($("#watch-main").attr("data-id")) || 0;

    const genres = [];
    $(".bmeta .meta:first-child > div:nth-child(5) span a[href*='/genre/']").each((i, el) => {
      genres.push($(el).text().trim());
    });

    return {
      slug,
      animeId,
      title,
      japaneseTitle,
      poster,
      type,
      synopsis,
      rating,
      genres,
      url: finalUrl
    };
  } catch (error) {
    throw error;
  }
};

export { extractRandom };