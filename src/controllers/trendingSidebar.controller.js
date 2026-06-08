import { extractTrendingSidebar } from "../extractors/trendingSidebar.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getTrendingSidebar = async (req, res, next) => {
  try {
    const cacheKey = "trendingSidebar";
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractTrendingSidebar();
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getTrendingSidebar };