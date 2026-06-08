import { extractStatus } from "../extractors/status.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    const { page = 1 } = req.query;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required (currently-airing, finished-airing, not-yet-aired)" });
    }

    const cacheKey = `status_${status}_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractStatus(status, page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getStatus };