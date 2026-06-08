import { extractStreamInfo, extractServerList, extractMapperServers } from "../extractors/streamInfo.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getStreamInfo = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: "Link ID is required" });
    }

    const cacheKey = `stream_${id}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractStreamInfo(id);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

const getServerList = async (req, res, next) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({ success: false, message: "Episode IDs are required" });
    }

    const cacheKey = `servers_${ids}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractServerList(ids);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

const getMapperServers = async (req, res, next) => {
  try {
    const { malId, slug, timestamp } = req.query;

    if (!malId || !slug || !timestamp) {
      return res.status(400).json({ success: false, message: "malId, slug, and timestamp are required" });
    }

    const cacheKey = `mapper_${malId}_${slug}_${timestamp}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractMapperServers(malId, slug, timestamp);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getStreamInfo, getServerList, getMapperServers };