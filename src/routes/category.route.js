import { getCategory } from "../controllers/category.controller.js";

const categoryRoutes = (app, jsonResponse, jsonError) => {
  app.get("/api/genre/:genre", async (req, res, next) => {
    req.params.category = `genre/${req.params.genre}`;
    try {
      await getCategory(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/type/:type", async (req, res, next) => {
    req.params.category = `type/${req.params.type}`;
    try {
      await getCategory(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  app.get("/api/status/:status", async (req, res, next) => {
    req.params.category = `status/${req.params.status}`;
    try {
      await getCategory(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });
};

export { categoryRoutes };