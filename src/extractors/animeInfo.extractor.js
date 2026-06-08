import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

const extractAnimeInfo = async (id) => {
  try {
    const url = `${BASE_URL}/anime/${id}`;
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const title = $(".film-name h1, .anisc-detail .film-name").text().trim() || "";
    const japaneseTitle = $(".film-name .alternate-title, .anisc-detail .film-name small").text().trim() || "";
    const poster = $(".film-poster img").attr("src") || "";
    const showType = $(".film-info .row .col1 .item:first-child .name").text().trim() || "";
    const quality = $(".film-info .row .col1 .item:nth-child(2) .name").text().trim() || "";

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

    const seasons = [];
    $(".seasons .season-item, .ss-list a").each((i, el) => {
      const seasonId = $(el).attr("href")?.split("/").pop() || "";
      const seasonTitle = $(el).text().trim() || "";
      const seasonPoster = $(el).find("img").attr("src") || "";

      if (seasonId) {
        seasons.push({
          id: seasonId,
          title: seasonTitle,
          poster: seasonPoster
        });
      }
    });

    const relatedData = [];
    $(".related-content .film-detail, .film-list-block .film-detail").each((i, el) => {
      const relId = $(el).find("a").attr("href")?.split("/").pop() || "";
      const relPoster = $(el).find("img").attr("src") || "";
      const relTitle = $(el).find(".film-name a").text().trim() || "";
      const relType = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";

      if (relId) {
        relatedData.push({
          id: relId,
          poster: relPoster,
          title: relTitle,
          type: relType
        });
      }
    });

    const recommendedData = [];
    $(".recommend-content .film-detail, .film-list-block .film-detail").each((i, el) => {
      const recId = $(el).find("a").attr("href")?.split("/").pop() || "";
      const recPoster = $(el).find("img").attr("src") || "";
      const recTitle = $(el).find(".film-name a").text().trim() || "";
      const recType = $(el).find(".fd-infor .fdi-item:first-child").text().trim() || "";

      if (recId) {
        recommendedData.push({
          id: recId,
          poster: recPoster,
          title: recTitle,
          type: recType
        });
      }
    });

    return {
      id,
      title,
      japaneseTitle,
      poster,
      showType,
      quality,
      overview,
      animeInfo,
      genres,
      seasons,
      relatedData,
      recommendedData
    };
  } catch (error) {
    throw error;
  }
};

export { extractAnimeInfo };