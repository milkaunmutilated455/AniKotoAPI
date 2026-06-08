import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";

const extractPages = async (url, page = 1) => {
  try {
    const finalUrl = page > 1 ? `${url}?page=${page}` : url;
    const { data } = await axios.get(finalUrl, { headers });
    const $ = cheerio.load(data);
    return $;
  } catch (error) {
    throw error;
  }
};

export { extractPages };