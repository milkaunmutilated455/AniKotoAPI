import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractHomeInfo = async () => {
  try {
    const { data } = await axios.get(URLS.home, { headers });
    const $ = cheerio.load(data);

    const spotlights = [];
    $(".swiper-slide, .spotlight-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const japaneseTitle = $(el).find(".fdi-item:nth-child(1)").text().trim() || "";
      const description = $(el).find(".fd-infor .desc, .film-description").text().trim() || "";
      const showType = $(el).find(".fdi-item:nth-child(2)").text().trim() || "";
      const duration = $(el).find(".fdi-item:nth-child(3)").text().trim() || "";
      const releaseDate = $(el).find(".fdi-item:nth-child(4)").text().trim() || "";

      if (id) {
        spotlights.push({
          id,
          poster,
          title,
          japaneseTitle,
          description,
          tvInfo: { showType, duration, releaseDate }
        });
      }
    });

    const trending = [];
    $(".trending-list .film-detail, .trending-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const number = parseInt($(el).find(".number").text().trim()) || i + 1;

      if (id) {
        trending.push({ id, number, poster, title });
      }
    });

    const topAiring = [];
    $(".section-id-02 .film-detail, .top-airing .film-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const japaneseTitle = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";

      if (id) {
        topAiring.push({ id, poster, title, japaneseTitle });
      }
    });

    const mostPopular = [];
    $(".section-id-03 .film-detail, .popular .film-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";

      if (id) {
        mostPopular.push({ id, poster, title });
      }
    });

    const mostFavorite = [];
    $(".section-id-04 .film-detail, .favorite .film-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";

      if (id) {
        mostFavorite.push({ id, poster, title });
      }
    });

    const latestCompleted = [];
    $(".section-id-05 .film-detail, .completed .film-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";

      if (id) {
        latestCompleted.push({ id, poster, title });
      }
    });

    const latestEpisode = [];
    $(".section-id-06 .film-detail, .latest .film-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const episode = $(el).find(".tick-eps, .tick-sub").text().trim() || "";

      if (id) {
        latestEpisode.push({ id, poster, title, episode });
      }
    });

    const genres = [];
    $(".genre-item, .genres a").each((i, el) => {
      const genre = $(el).text().trim();
      if (genre) genres.push(genre);
    });

    return {
      spotlights,
      trending,
      topAiring,
      mostPopular,
      mostFavorite,
      latestCompleted,
      latestEpisode,
      genres
    };
  } catch (error) {
    throw error;
  }
};

export { extractHomeInfo };