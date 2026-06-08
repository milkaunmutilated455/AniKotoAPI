/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKatoAPI — server.js
 * Repository: https://github.com/Shineii86/AniKatoAPI
 *
 * @description
 *   Main entry point for the AniKatoAPI Express server.
 *   Configures CORS, middleware, static files, API routes,
 *   and 404 handling. Starts the server on the configured port.
 *
 * @exports
 *   None (side-effect: starts Express server)
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createApiRoutes } from "./src/routes/apiRoutes.js";

dotenv.config();

// ══════════════════════════════════════════════════════════════
// SERVER CONFIGURATION
// ══════════════════════════════════════════════════════════════

const app = express();
const PORT = process.env.PORT || 4444;
const __filename = fileURLToPath(import.meta.url);
const publicDir = path.join(dirname(__filename), "public");
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",");

// ══════════════════════════════════════════════════════════════
// CORS MIDDLEWARE
// ══════════════════════════════════════════════════════════════

// NOTE: CORS is configured to only allow GET requests from specified origins
app.use(
  cors({
    origin: allowedOrigins?.includes("*") ? "*" : allowedOrigins || [],
    methods: ["GET"],
  })
);

// ---- FEATURE: Custom origin validation middleware ----
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (
    !allowedOrigins ||
    allowedOrigins.includes("*") ||
    (origin && allowedOrigins.includes(origin))
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return next();
  }
  res
    .status(403)
    .json({ success: false, message: "Forbidden: Origin not allowed" });
});

// ══════════════════════════════════════════════════════════════
// STATIC FILES
// ══════════════════════════════════════════════════════════════

// NOTE: redirect: false prevents automatic redirects to index.html
app.use(express.static(publicDir, { redirect: false }));

// ══════════════════════════════════════════════════════════════
// RESPONSE HELPERS
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Standardized JSON response wrapper ----
/**
 * Wraps data in a standardized success JSON response.
 *
 * @param {object} res - Express response object
 * @param {*} data - The data to return in the response
 * @param {number} status - HTTP status code (default: 200)
 */
const jsonResponse = (res, data, status = 200) =>
  res.status(status).json({ success: true, results: data });

// ---- FEATURE: Standardized error response wrapper ----
/**
 * Returns a standardized error JSON response.
 *
 * @param {object} res - Express response object
 * @param {string} message - Error message to return (default: "Internal server error")
 * @param {number} status - HTTP status code (default: 500)
 */
const jsonError = (res, message = "Internal server error", status = 500) =>
  res.status(status).json({ success: false, message });

// ══════════════════════════════════════════════════════════════
// API ROUTES
// ══════════════════════════════════════════════════════════════

createApiRoutes(app, jsonResponse, jsonError);

// ══════════════════════════════════════════════════════════════
// 404 HANDLER
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Catch-all 404 handler for undefined routes ----
app.use((req, res) => {
  const filePath = path.join(publicDir, "404.html");
  if (fs.existsSync(filePath)) {
    res.status(404).sendFile(filePath);
  } else {
    res.status(404).json({ success: false, message: "Endpoint not found" });
  }
});

// ══════════════════════════════════════════════════════════════
// SERVER START
// ══════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.info(`AniKatoAPI listening at ${PORT}`);
});

// ══════════════════════════════════════════════════════════════ END: server.js