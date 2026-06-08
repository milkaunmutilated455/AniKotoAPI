import { extractFilter } from "../extractors/filter.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getFilter = async (req, res, next) => {
  try {
    const params = req.query;
    const cacheKey = `filter_${JSON.stringify(params)}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractFilter(params);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getFilter };