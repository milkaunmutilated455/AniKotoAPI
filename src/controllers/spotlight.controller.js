import { extractSpotlight } from "../extractors/spotlight.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getSpotlight = async (req, res, next) => {
  try {
    const cacheKey = "spotlight";
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractSpotlight();
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getSpotlight };