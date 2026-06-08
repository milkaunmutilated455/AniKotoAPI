import { extractStreamInfo } from "../extractors/streamInfo.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getStreamInfo = async (req, res, next) => {
  try {
    const { id, server = "hd-1", type = "sub" } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: "Episode ID is required" });
    }

    const cacheKey = `stream_${id}_${server}_${type}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractStreamInfo(id, server, type);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getStreamInfo };