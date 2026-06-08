import { extractAnimeInfo } from "../extractors/animeInfo.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getAnimeInfo = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ success: false, message: "Anime ID is required" });
    }

    const cacheKey = `anime_${id}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractAnimeInfo(id);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getAnimeInfo };