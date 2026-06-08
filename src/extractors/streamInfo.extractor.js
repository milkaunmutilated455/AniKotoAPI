import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractStreamInfo = async (episodeId) => {
  try {
    const url = `${URLS.serverList}?episodeId=${episodeId}`;
    const { data } = await axios.get(url, { 
      headers: {
        ...headers,
        "X-Requested-With": "XMLHttpRequest"
      }
    });
    
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

    const links = [];
    $("li[data-link-id]").each((i, el) => {
      const linkId = $(el).attr("data-link-id") || "";
      const linkType = $(el).attr("data-type") || "hls";

      if (linkId) {
        links.push({ id: linkId, type: linkType });
      }
    });

    return {
      episodeId,
      servers,
      links
    };
  } catch (error) {
    throw error;
  }
};

export { extractStreamInfo };