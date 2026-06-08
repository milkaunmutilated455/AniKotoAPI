import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS, BASE_URL } from "../configs/dataUrl.js";

const extractWatchPage = async (slug, ep) => {
  try {
    const url = URLS.episode(slug, ep);
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const animeId = parseInt($("#watch-main").attr("data-id")) || parseInt($("div[data-id]").attr("data-id")) || 0;
    const animeUrl = $("#watch-main").attr("data-url") || "";
    const title = $(".heading-name a").text().trim() || slug;
    const japaneseTitle = $(".heading-name .alternate-title").text().trim() || "";
    const episodeNumber = parseInt(ep) || 0;

    const synopsis = $(".synopsis .content, .film-description .text").text().trim() || "";

    const animeInfo = {};
    $(".bmeta .meta div").each((i, el) => {
      const label = $(el).find("strong, b").text().trim().replace(":", "");
      const value = $(el).find("span, a").text().trim();
      if (label && value) {
        animeInfo[label] = value;
      }
    });

    const genres = [];
    $(".bmeta .meta div:contains('Genres') a").each((i, el) => {
      const genre = $(el).text().trim();
      if (genre) genres.push(genre);
    });

    const rating = $(".brating .score .value, #w-rating .score").text().trim() || "";
    const MALScore = $(".bmeta .meta div:contains('MAL') span").text().trim() || "";

    const poster = $(".poster img[itemprop='image'], .binfo .poster img").attr("src") || "";
    const backgroundImage = $("#player").css("background-image")?.match(/url\(['"]?(.+?)['"]?\)/)?.[1] || "";

    const nextEpisodeDate = $(".next-episode, .alert.next-episode").text().trim() || "";
    const nextEpisodeTimestamp = parseInt($(".count-down").attr("data-target")) || 0;

    const episodeList = [];
    $("#w-episodes .ep-item, .episodes-list a, .ss-list a").each((i, el) => {
      const epId = $(el).attr("data-id") || $(el).attr("data-ep-id") || "";
      const epNum = parseInt($(el).find(".ep-number, .ep-num").text().trim()) || i + 1;
      const epTitle = $(el).find(".ep-title, .ep-name").text().trim() || "";
      const isActive = $(el).hasClass("active") || $(el).hasClass("selected") || false;

      if (epId || epNum) {
        episodeList.push({
          id: epId,
          episode_no: epNum,
          title: epTitle,
          active: isActive
        });
      }
    });

    const servers = [];
    $("#w-servers .servers .type li, #w-servers li").each((i, el) => {
      const linkId = $(el).attr("data-link-id") || "";
      const epId = $(el).attr("data-ep-id") || "";
      const cmId = $(el).attr("data-cmid") || "";
      const svId = $(el).attr("data-sv-id") || "";
      const serverName = $(el).text().trim() || "";
      const serverType = $(el).closest(".type").attr("data-type") || "";

      if (linkId) {
        servers.push({
          linkId,
          epId,
          cmId,
          svId,
          name: serverName,
          type: serverType
        });
      }
    });

    const trending = [];
    $(".w-side-section .scaff.side.items a.item").each((i, el) => {
      const trendSlug = $(el).attr("href")?.split("/watch/").pop() || "";
      const trendPoster = $(el).find(".poster img").attr("src") || "";
      const trendTitle = $(el).find(".name").text().trim() || "";
      const trendType = $(el).find(".dot:last-child").text().trim() || "";
      const trendScore = $(el).find(".score").text().trim() || "";

      if (trendSlug) {
        trending.push({
          slug: trendSlug,
          poster: trendPoster,
          title: trendTitle,
          type: trendType,
          score: trendScore
        });
      }
    });

    const recommended = [];
    $(".w-side-section:has(.title:contains('Recommended')) a.item, aside.sidebar:last .w-side-section a.item").each((i, el) => {
      const recSlug = $(el).attr("href")?.split("/watch/").pop() || "";
      const recPoster = $(el).find(".poster img").attr("src") || "";
      const recTitle = $(el).find(".name").text().trim() || "";
      const recType = $(el).find(".dot:last-child").text().trim() || "";

      if (recSlug) {
        recommended.push({
          slug: recSlug,
          poster: recPoster,
          title: recTitle,
          type: recType
        });
      }
    });

    return {
      slug,
      animeId,
      animeUrl,
      title,
      japaneseTitle,
      episodeNumber,
      synopsis,
      animeInfo,
      genres,
      rating,
      MALScore,
      poster,
      backgroundImage,
      nextEpisodeDate,
      nextEpisodeTimestamp,
      episodeList,
      servers,
      trending,
      recommended
    };
  } catch (error) {
    throw error;
  }
};

export { extractWatchPage };