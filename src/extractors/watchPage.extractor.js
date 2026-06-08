import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractWatchPage = async (slug, ep) => {
  try {
    const url = URLS.episode(slug, ep);
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const title = $(".heading-name a").text().trim() || "";
    const japaneseTitle = $(".heading-name .alternate-title").text().trim() || "";
    const animeId = $(".heading-name a").attr("href")?.split("/watch/").pop()?.split("/")[0] || "";

    const episodeNumber = parseInt($(".heading-name .episode").text().trim()) || parseInt(ep) || 0;

    const synopsis = $(".anisc-detail .description, .film-description .text").text().trim() || "";

    const animeInfo = {};
    $(".anisc-info .item").each((i, el) => {
      const label = $(el).find(".name").text().trim().replace(":", "");
      const value = $(el).find(".text").text().trim();
      if (label && value) {
        animeInfo[label] = value;
      }
    });

    const genres = [];
    $(".anisc-info .item:last-child a, .genres a").each((i, el) => {
      const genre = $(el).text().trim();
      if (genre) genres.push(genre);
    });

    const servers = [];
    $(".servers .server-item, .type-list .server-item").each((i, el) => {
      const serverId = $(el).attr("data-id") || $(el).attr("data-server-id") || "";
      const serverName = $(el).text().trim() || "";
      const serverType = $(el).hasClass("sub") ? "sub" : "dub";

      if (serverId) {
        servers.push({ id: serverId, name: serverName, type: serverType });
      }
    });

    const episodeList = [];
    $(".episodes-list .ep-item, .ss-list a").each((i, el) => {
      const epId = $(el).attr("data-id") || "";
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

    const nextEpisodeDate = $(".next-episode, .schedule-next").text().trim() || "";
    const prevEpisode = $(".ep-prev a").attr("href")?.split("/ep-").pop() || "";
    const nextEpisode = $(".ep-next a").attr("href")?.split("/ep-").pop() || "";

    const relatedData = [];
    $(".related-content .item, .film-list-block .item").each((i, el) => {
      const relSlug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const relPoster = $(el).find("img").attr("src") || "";
      const relTitle = $(el).find(".name, .film-name a").text().trim() || "";
      const relType = $(el).find(".type, .fdi-item:first-child").text().trim() || "";

      if (relSlug) {
        relatedData.push({ slug: relSlug, poster: relPoster, title: relTitle, type: relType });
      }
    });

    const recommendedData = [];
    $(".recommend-content .item, .film-list-block .item").each((i, el) => {
      const recSlug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const recPoster = $(el).find("img").attr("src") || "";
      const recTitle = $(el).find(".name, .film-name a").text().trim() || "";
      const recType = $(el).find(".type, .fdi-item:first-child").text().trim() || "";

      if (recSlug) {
        recommendedData.push({ slug: recSlug, poster: recPoster, title: recTitle, type: recType });
      }
    });

    const trending = [];
    $(".trending-list .item, .top-tables .item").each((i, el) => {
      const trendSlug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const trendPoster = $(el).find("img").attr("src") || "";
      const trendTitle = $(el).find(".name").text().trim() || "";
      const trendType = $(el).find(".type").text().trim() || "";

      if (trendSlug) {
        trending.push({ slug: trendSlug, poster: trendPoster, title: trendTitle, type: trendType });
      }
    });

    return {
      slug,
      title: title || slug,
      japaneseTitle,
      animeId,
      episodeNumber,
      synopsis,
      animeInfo,
      genres,
      servers,
      episodeList,
      nextEpisodeDate,
      prevEpisode,
      nextEpisode,
      relatedData,
      recommendedData,
      trending
    };
  } catch (error) {
    throw error;
  }
};

export { extractWatchPage };