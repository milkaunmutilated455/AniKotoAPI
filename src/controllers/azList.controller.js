import { extractAzList } from "../extractors/azList.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getAzList = async (req, res, next) => {
  try {
    const { letter = "all" } = req.params;
    const { page = 1 } = req.query;

    const cacheKey = `azlist_${letter}_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractAzList(letter, page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getAzList };