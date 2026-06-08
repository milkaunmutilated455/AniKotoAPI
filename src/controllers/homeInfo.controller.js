import { extractHomeInfo } from "../extractors/homeInfo.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getHomeInfo = async (req, res, next) => {
  try {
    const cacheKey = "home";
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractHomeInfo();
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getHomeInfo };