# Architecture

> Project structure, tech stack, and design decisions.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Scraper | Cheerio + Axios |
| Deployment | Vercel (Serverless) |
| Language | JavaScript (ES Modules) |

## Project Structure

```
AniKotoAPI/
├── server.js                 # Express entry point
├── vercel.json               # Vercel deployment config
├── package.json              # Dependencies and scripts
├── public/                   # Static files
│   ├── index.html            # Landing page
│   ├── 404.html              # Error page
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # Crawler directives
│   ├── sitemap.xml           # XML sitemap
│   ├── og-image.svg          # Open Graph image
│   ├── privacy.html          # Privacy policy
│   └── tos.html              # Terms of service
├── src/
│   ├── configs/
│   │   ├── dataUrl.js        # URL patterns for anikototv.to
│   │   ├── header.config.js  # Request headers
│   │   └── ids.config.js     # Genre/type/status ID mappings
│   ├── controllers/
│   │   ├── homeInfo.controller.js
│   │   ├── animeInfo.controller.js
│   │   ├── search.controller.js
│   │   ├── episodeList.controller.js
│   │   ├── episodeListAjax.controller.js
│   │   ├── streamInfo.controller.js
│   │   ├── schedule.controller.js
│   │   ├── spotlight.controller.js
│   │   ├── trending.controller.js
│   │   ├── topten.controller.js
│   │   ├── suggestion.controller.js
│   │   ├── random.controller.js
│   │   ├── popular.controller.js
│   │   ├── filter.controller.js
│   │   ├── watchPage.controller.js
│   │   ├── azList.controller.js
│   │   ├── newRelease.controller.js
│   │   ├── status.controller.js
│   │   ├── trendingSidebar.controller.js
│   │   ├── seasons.controller.js
│   │   └── watchOrder.controller.js
│   ├── extractors/
│   │   ├── homeInfo.extractor.js
│   │   ├── animeInfo.extractor.js
│   │   ├── search.extractor.js
│   │   ├── episodeList.extractor.js
│   │   ├── streamInfo.extractor.js
│   │   ├── schedule.extractor.js
│   │   ├── spotlight.extractor.js
│   │   ├── trending.extractor.js
│   │   ├── topten.extractor.js
│   │   ├── suggestion.extractor.js
│   │   ├── random.extractor.js
│   │   ├── popular.extractor.js
│   │   ├── filter.extractor.js
│   │   ├── watchPage.extractor.js
│   │   ├── azList.extractor.js
│   │   ├── newRelease.extractor.js
│   │   ├── status.extractor.js
│   │   ├── trendingSidebar.extractor.js
│   │   ├── seasons.extractor.js
│   │   └── watchOrder.extractor.js
│   ├── routes/
│   │   ├── apiRoutes.js      # Main API router
│   │   └── category.route.js # Genre/type/status routes
│   └── helper/
│       └── cache.helper.js   # In-memory cache
└── docs/                     # Documentation
    ├── index.md
    ├── endpoints.md
    ├── streaming.md
    ├── examples.md
    └── architecture.md
```

## Request Flow

```
Client Request
     │
     ▼
┌─────────────┐
│  vercel.json │ ─── /api/* ──→ server.js
│  (routing)   │ ─── /* ─────→ public/
└─────────────┘
     │
     ▼
┌─────────────┐
│  server.js   │
│  (Express)   │
└─────────────┘
     │
     ▼
┌─────────────┐
│ apiRoutes.js │ ─── Route matching
└─────────────┘
     │
     ▼
┌─────────────┐
│ Controllers  │ ─── Business logic, cache check
└─────────────┘
     │
     ▼
┌─────────────┐
│ Extractors   │ ─── HTTP request + HTML parsing
└─────────────┘
     │
     ▼
┌─────────────┐
│ anikototv.to │ ─── Source data
└─────────────┘
```

## Caching

The API uses an in-memory cache with a 5-minute TTL:

```javascript
// Cache key format: {endpoint}_{id}
// Examples:
// "episodes_naruto-shippuden"
// "stream_MTF1dkFtaW9..."
// "servers_SlNVT25..."
```

**Characteristics:**
- Stored in a JavaScript `Map`
- TTL: 5 minutes (300,000 ms)
- Reset on server restart (serverless = every cold start)
- Key format: `{type}_{identifier}`

## Source Site Structure

The API scrapes data from `anikototv.to`:

| Page | URL Pattern | Data |
|------|-------------|------|
| Home | `/home` | Spotlight, trending, popular |
| Watch | `/watch/{slug}` | Anime info, anime ID |
| Episode | `/watch/{slug}/ep-{n}` | Episode data |
| Search | `/filter?keyword={q}` | Search results |
| Genre | `/genre/{name}` | Genre listings |
| Type | `/type/{name}` | Type listings |
| Status | `/status/{name}` | Status listings |
| A-Z | `/az-list/{letter}` | Alphabetical list |

**AJAX Endpoints:**

| Endpoint | URL Pattern | Data |
|----------|-------------|------|
| Episodes | `/ajax/episode/list/{animeId}` | Episode list HTML |
| Servers | `/ajax/server/list?servers={ids}` | Server list HTML |
| Stream | `/ajax/server?get={linkId}` | Stream URL JSON |

## ID Mappings

Genre IDs (partial):

```javascript
{
  action: 1,
  adventure: 2,
  comedy: 4,
  demons: 5,
  drama: 8,
  fantasy: 10,
  isekai: 19,
  romance: 22,
  shounen: 27,
  supernatural: 37
}
```

Type IDs:

```javascript
{
  movie: 1,
  music: 2,
  ona: 3,
  ova: 4,
  special: 5,
  tv: 6
}
```

Status IDs:

```javascript
{
  "currently-airing": 1,
  "finished-airing": 2,
  "not-yet-aired": 3
}
```

## Vercel Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js",
      "headers": { "Access-Control-Allow-Origin": "*" }
    },
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common errors:

| Status | Message | Cause |
|--------|---------|-------|
| 400 | "Link ID is required" | Missing `id` parameter |
| 400 | "Episode IDs are required" | Missing `ids` parameter |
| 400 | "Anime slug is required" | Missing anime slug |
| 500 | "Internal server error" | Scraping failed or site down |
