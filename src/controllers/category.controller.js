import { extractCategory } from "../extractors/category.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page = 1 } = req.query;

    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    const cacheKey = `category_${category}_${page}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractCategory(category, page);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getCategory };