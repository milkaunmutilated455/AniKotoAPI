import { extractPopular } from "../extractors/popular.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getPopular = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const cacheKey = `popular_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractPopular(page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getPopular };