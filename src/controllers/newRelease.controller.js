import { extractNewRelease, extractNewlyAdded } from "../extractors/newRelease.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getNewRelease = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const cacheKey = `newrelease_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractNewRelease(page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

const getNewlyAdded = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const cacheKey = `newlyadded_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractNewlyAdded(page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getNewRelease, getNewlyAdded };