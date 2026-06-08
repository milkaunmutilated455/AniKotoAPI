import { extractWatchPage } from "../extractors/watchPage.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getWatchPage = async (req, res, next) => {
  try {
    const { slug, ep } = req.query;

    if (!slug || !ep) {
      return res.status(400).json({ success: false, message: "Slug and episode number are required" });
    }

    const cacheKey = `watch_${slug}_${ep}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractWatchPage(slug, ep);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getWatchPage };