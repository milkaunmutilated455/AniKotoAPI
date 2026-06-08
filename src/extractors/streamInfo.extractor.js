import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

const extractStreamInfo = async (episodeId, server = "hd-1", type = "sub") => {
  try {
    const url = `${BASE_URL}/watch/${episodeId}`;
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const servers = [];
    $(".servers .server-item, .type-list .server-item").each((i, el) => {
      const serverId = $(el).attr("data-id") || $(el).attr("data-server-id") || "";
      const serverName = $(el).text().trim() || "";
      const serverType = $(el).hasClass("sub") ? "sub" : "dub";

      if (serverId) {
        servers.push({ id: serverId, name: serverName, type: serverType });
      }
    });

    const sources = [];
    $(".player-source .source-item, .embed-source").each((i, el) => {
      const sourceId = $(el).attr("data-id") || "";
      const sourceUrl = $(el).attr("data-src") || $(el).find("iframe").attr("src") || "";
      const sourceType = $(el).attr("data-type") || "hls";

      if (sourceId || sourceUrl) {
        sources.push({ id: sourceId, url: sourceUrl, type: sourceType });
      }
    });

    const subtitles = [];
    $(".player-sub .sub-item, .subtitle-item").each((i, el) => {
      const subUrl = $(el).attr("data-url") || $(el).attr("src") || "";
      const subLabel = $(el).text().trim() || "";
      const subLang = $(el).attr("data-lang") || "en";

      if (subUrl) {
        subtitles.push({ url: subUrl, label: subLabel, language: subLang });
      }
    });

    return {
      episodeId,
      server,
      type,
      servers,
      sources,
      subtitles
    };
  } catch (error) {
    throw error;
  }
};

export { extractStreamInfo };