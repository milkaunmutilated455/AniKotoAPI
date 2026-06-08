import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

const extractStreamInfo = async (linkId) => {
  try {
    const url = `${BASE_URL}/ajax/server?get=${linkId}`;
    const { data } = await axios.get(url, {
      headers: {
        ...headers,
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    if (!data || !data.result) {
      return { linkId, url: null, skipData: null };
    }

    return {
      linkId,
      url: data.result.url || null,
      skipData: data.result.skip_data || null
    };
  } catch (error) {
    throw error;
  }
};

const extractServerList = async (episodeIds) => {
  try {
    const url = `${BASE_URL}/ajax/server/list?servers=${episodeIds}`;
    const { data } = await axios.get(url, {
      headers: {
        ...headers,
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const extractMapperServers = async (malId, slug, timestamp) => {
  try {
    const url = `https://mapper.nekostream.site/api/mal/${malId}/${slug}/${timestamp}`;
    const { data } = await axios.get(url, { headers });

    const servers = [];

    if (data && typeof data === "object") {
      for (const [provider, sources] of Object.entries(data)) {
        if (sources && sources.sub) {
          servers.push({
            provider,
            type: "sub",
            url: sources.sub.url || null,
            download: sources.sub.download || null
          });
        }
        if (sources && sources.dub) {
          servers.push({
            provider,
            type: "dub",
            url: sources.dub.url || null,
            download: sources.dub.download || null
          });
        }
      }
    }

    return servers;
  } catch (error) {
    return [];
  }
};

export { extractStreamInfo, extractServerList, extractMapperServers };