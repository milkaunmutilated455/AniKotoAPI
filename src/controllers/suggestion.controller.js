import { extractSuggestions } from "../extractors/suggestion.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getSuggestions = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ success: false, message: "Keyword is required" });
    }

    const cacheKey = `suggest_${keyword}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractSuggestions(keyword);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getSuggestions };