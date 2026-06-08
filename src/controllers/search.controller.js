import { extractSearchResults, extractSearchSuggestions } from "../extractors/search.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getSearchResults = async (req, res, next) => {
  try {
    const { keyword, page = 1 } = req.query;
    if (!keyword) {
      return res.status(400).json({ success: false, message: "Keyword is required" });
    }

    const cacheKey = `search_${keyword}_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractSearchResults(keyword, page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

const getSearchSuggestions = async (req, res, next) => {
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

    const data = await extractSearchSuggestions(keyword);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getSearchResults, getSearchSuggestions };