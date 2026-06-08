import { extractSchedule } from "../extractors/schedule.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getSchedule = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required (YYYY-MM-DD)" });
    }

    const cacheKey = `schedule_${date}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractSchedule(date);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getSchedule };