import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractSpotlight = async () => {
  try {
    const { data } = await axios.get(URLS.home, { headers });
    const $ = cheerio.load(data);

    const spotlights = [];
    $("#hotest .swiper-slide.item").each((i, el) => {
      const slug = $(el).find("a.play").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".image div").attr("style")?.match(/url\(['"]?(.+?)['"]?\)/)?.[1] || "";
      const title = $(el).find("h2.title.d-title").text().trim() || "";
      const japaneseTitle = $(el).find("h2.title.d-title").attr("data-jp") || "";
      const description = $(el).find(".desc").text().trim() || "";
      const rating = $(el).find("i.rating").text().trim() || "";
      const quality = $(el).find("i.quality").text().trim() || "";
      const sub = parseInt($(el).find("i.sub").text().trim()) || 0;
      const dub = parseInt($(el).find("i.dub").text().trim()) || 0;
      const date = $(el).find("i.date").text().trim() || "";

      if (slug) {
        spotlights.push({
          slug,
          poster,
          title,
          japaneseTitle,
          description,
          rating,
          quality,
          sub,
          dub,
          date
        });
      }
    });

    return spotlights;
  } catch (error) {
    throw error;
  }
};

export { extractSpotlight };