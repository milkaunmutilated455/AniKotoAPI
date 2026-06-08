import { extractTopTen } from "../extractors/topten.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getTopTen = async (req, res, next) => {
  try {
    const cacheKey = "topTen";
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractTopTen();
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getTopTen };