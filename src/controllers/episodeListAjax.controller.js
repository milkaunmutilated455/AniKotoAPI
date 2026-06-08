import { extractEpisodeListAjax } from "../extractors/episodeListAjax.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

const getEpisodeListAjax = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { style, vrf } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: "Anime ID is required" });
    }

    const cacheKey = `episodes_ajax_${id}_${style || ""}_${vrf || ""}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }

    const data = await extractEpisodeListAjax(id, style, vrf);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getEpisodeListAjax };