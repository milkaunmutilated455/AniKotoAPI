import { extractWatchOrder } from "../extractors/watchOrder.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getWatchOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Anime ID is required" });
    }

    const cacheKey = `watchorder_${id}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractWatchOrder(id);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getWatchOrder };