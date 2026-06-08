import { extractStreamInfo } from "../extractors/streamInfo.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getStreamInfo = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: "Episode ID is required" });
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

export { getStreamInfo };