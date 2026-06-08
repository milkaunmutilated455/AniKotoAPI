import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

const extractTrendingSidebar = async () => {
  try {
    const { data } = await axios.get(URLS.home, { headers });
    const $ = cheerio.load(data);

    const day = [];
    const week = [];
    const month = [];

    $("#top-anime .tab-content[data-name='day'] a.item").each((i, el) => {
      const slug = $(el).attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const name = $(el).find(".name").text().trim() || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const type = $(el).find(".type").text().trim() || "";
      const rank = i + 1;

      if (slug) {
        day.push({ slug, rank, name, poster, sub, dub, type });
      }
    });

    $("#top-anime .tab-content[data-name='week'] a.item").each((i, el) => {
      const slug = $(el).attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const name = $(el).find(".name").text().trim() || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const type = $(el).find(".type").text().trim() || "";
      const rank = i + 1;

      if (slug) {
        week.push({ slug, rank, name, poster, sub, dub, type });
      }
    });

    $("#top-anime .tab-content[data-name='month'] a.item").each((i, el) => {
      const slug = $(el).attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const name = $(el).find(".name").text().trim() || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const type = $(el).find(".type").text().trim() || "";
      const rank = i + 1;

      if (slug) {
        month.push({ slug, rank, name, poster, sub, dub, type });
      }
    });

    const latestEpisodes = [];
    $("#recent-update .item, .section-updated .item").each((i, el) => {
      const slug = $(el).find("a.name.d-title").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const title = $(el).find("a.name.d-title").text().trim() || "";
      const japaneseTitle = $(el).find("a.name.d-title").attr("data-jp") || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const total = parseInt($(el).find(".ep-status.total span").text().trim()) || 0;
      const type = $(el).find(".meta .inner .right").text().trim() || "";

      if (slug) {
        latestEpisodes.push({ slug, poster, title, japaneseTitle, sub, dub, total, type });
      }
    });

    return { day, week, month, latestEpisodes };
  } catch (error) {
    throw error;
  }
};

export { extractTrendingSidebar };