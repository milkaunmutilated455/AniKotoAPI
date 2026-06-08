# AniKotoAPI Documentation

> Free REST API for anime data. Browse, search, stream — no API key required.

## Overview

AniKotoAPI is a free, open-source REST API that provides anime data scraped from [anikototv.to](https://anikototv.to). It's built with Node.js, Express, and Cheerio, and deployed on Vercel.

**Base URL:** `https://anikototvapi.vercel.app/api`

## Quick Start

```bash
# Get homepage data
curl https://anikototvapi.vercel.app/api

# Search for anime
curl "https://anikototvapi.vercel.app/api/search?keyword=naruto"

# Get anime info
curl "https://anikototvapi.vercel.app/api/info?id=naruto-shippuden"
```

## Features

- **24+ Endpoints** — Home, search, info, episodes, streaming, schedule, and more
- **No API Key** — Just make requests, no registration needed
- **In-Memory Cache** — 5-minute TTL for fast responses
- **CORS Enabled** — Access from any domain
- **JSON Responses** — Standardized `{success, results}` format

## Documentation

- [API Endpoints Reference](endpoints.md) — Complete endpoint documentation
- [Streaming Flow Guide](streaming.md) — How to get stream URLs
- [Code Examples](examples.md) — cURL, JavaScript, Python
- [Architecture](architecture.md) — Project structure and design

## Response Format

All endpoints return JSON in this format:

```json
{
  "success": true,
  "results": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Rate Limiting

There are no explicit rate limits, but the API uses a 5-minute in-memory cache. Repeated requests for the same data will be served from cache.

## Disclaimer

This API is for **educational purposes only**. It scrapes publicly available data from anikototv.to. We are not affiliated with or endorsed by AniKoto. All content belongs to its respective owners.
