import { extractRandom } from "../extractors/random.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getRandom = async (req, res, next) => {
  try {
    const cacheKey = "random";
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractRandom();
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getRandom };