import { getHomeInfo } from "../controllers/homeInfo.controller.js";
import { getAnimeInfo } from "../controllers/animeInfo.controller.js";
import { getSearchResults, getSearchSuggestions } from "../controllers/search.controller.js";
import { getEpisodeList } from "../controllers/episodeList.controller.js";
import { getStreamInfo } from "../controllers/streamInfo.controller.js";
import { getSchedule } from "../controllers/schedule.controller.js";
import { getSpotlight } from "../controllers/spotlight.controller.js";
import { getTrending } from "../controllers/trending.controller.js";
import { getTopTen } from "../controllers/topten.controller.js";
import { getSuggestions } from "../controllers/suggestion.controller.js";
import { getRandom } from "../controllers/random.controller.js";
import { getPopular } from "../controllers/popular.controller.js";
import { getFilter } from "../controllers/filter.controller.js";
import { getWatchPage } from "../controllers/watchPage.controller.js";
import { getAzList } from "../controllers/azList.controller.js";
import { getNewRelease, getNewlyAdded } from "../controllers/newRelease.controller.js";
import { getStatus } from "../controllers/status.controller.js";
import { getTrendingSidebar } from "../controllers/trendingSidebar.controller.js";
import { categoryRoutes } from "./category.route.js";

const createApiRoutes = (app, jsonResponse, jsonError) => {
  app.get("/api/", async (req, res, next) => {
    try {
      await getHomeInfo(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/info", async (req, res, next) => {
    try {
      await getAnimeInfo(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/watch", async (req, res, next) => {
    try {
      await getWatchPage(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/search", async (req, res, next) => {
    try {
      await getSearchResults(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/search/suggest", async (req, res, next) => {
    try {
      await getSearchSuggestions(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/episodes/:id", async (req, res, next) => {
    try {
      await getEpisodeList(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/stream", async (req, res, next) => {
    try {
      await getStreamInfo(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/schedule", async (req, res, next) => {
    try {
      await getSchedule(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/spotlight", async (req, res, next) => {
    try {
      await getSpotlight(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/trending", async (req, res, next) => {
    try {
      await getTrending(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/top-ten", async (req, res, next) => {
    try {
      await getTopTen(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/suggestions", async (req, res, next) => {
    try {
      await getSuggestions(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/random", async (req, res, next) => {
    try {
      await getRandom(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/most-popular", async (req, res, next) => {
    try {
      await getPopular(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/filter", async (req, res, next) => {
    try {
      await getFilter(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/new-release", async (req, res, next) => {
    try {
      await getNewRelease(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/newly-added", async (req, res, next) => {
    try {
      await getNewlyAdded(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/trending-sidebar", async (req, res, next) => {
    try {
      await getTrendingSidebar(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/az-list/:letter", async (req, res, next) => {
    try {
      await getAzList(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/status/:status", async (req, res, next) => {
    try {
      await getStatus(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  categoryRoutes(app, jsonResponse, jsonError);
};

export { createApiRoutes };