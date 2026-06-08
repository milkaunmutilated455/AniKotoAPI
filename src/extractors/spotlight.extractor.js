import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractSpotlight = async () => {
  try {
    const { data } = await axios.get(URLS.home, { headers });
    const $ = cheerio.load(data);

    const spotlights = [];
    $(".swiper-slide, .spotlight-item").each((i, el) => {
      const id = $(el).find("a").attr("href")?.split("/").pop() || "";
      const poster = $(el).find("img").attr("src") || "";
      const title = $(el).find(".film-name a, .dynamic-name").text().trim() || "";
      const japaneseTitle = $(el).find(".fdi-item:nth-child(1)").text().trim() || "";
      const description = $(el).find(".fd-infor .desc, .film-description").text().trim() || "";
      const showType = $(el).find(".fdi-item:nth-child(2)").text().trim() || "";
      const duration = $(el).find(".fdi-item:nth-child(3)").text().trim() || "";
      const releaseDate = $(el).find(".fdi-item:nth-child(4)").text().trim() || "";

      if (id) {
        spotlights.push({
          id,
          poster,
          title,
          japaneseTitle,
          description,
          tvInfo: { showType, duration, releaseDate }
        });
      }
    });

    return spotlights;
  } catch (error) {
    throw error;
  }
};

export { extractSpotlight };