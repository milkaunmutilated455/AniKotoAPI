import { getCategory } from "../controllers/category.controller.js";

const categoryRoutes = (app, jsonResponse, jsonError) => {
  app.get("/api/:category", async (req, res, next) => {
    try {
      await getCategory(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });
};

export { categoryRoutes };