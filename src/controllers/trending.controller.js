import { extractTrending } from "../extractors/trending.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getTrending = async (req, res, next) => {
  try {
    const cacheKey = "trending";
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractTrending();
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getTrending };