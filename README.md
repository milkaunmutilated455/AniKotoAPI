# AniKatoAPI

A RESTful API for anime data from [anikototv.to](https://anikototv.to). Built with Node.js, Express, and Cheerio for web scraping.

> **Disclaimer:** This API is for educational purposes only. It does not host any content - it only scrapes publicly available data from anikototv.to.

## Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Shineii86/AniKatoAPI)

## Features

- Home page data (spotlight, trending, top anime)
- Anime details & info
- Search with suggestions
- Episode lists
- Streaming server info
- Top 10 rankings (day/week/month)
- Filter by genre, type, status, rating
- Category browsing
- Random anime
- 5-minute response caching
- CORS support

## Installation

```bash
git clone https://github.com/Shineii86/AniKatoAPI.git
cd AniKatoAPI
npm install
cp .env.example .env
npm start
```

Server runs on `http://localhost:4444` by default.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `4444` |
| `ALLOWED_ORIGINS` | Comma-separated allowed origins | `*` |

## API Endpoints

### Base URL
```
https://your-deployment.vercel.app/api
```

### Home
```
GET /api/
```
Returns spotlight, trending, top airing, and genre list.

### Anime Info
```
GET /api/info?id={anime-slug}
```
Returns detailed info, genres, episodes, related & recommended anime.

| Param | Type | Required |
|---|---|---|
| `id` | string | Yes |

### Search
```
GET /api/search?keyword={keyword}&page={page}
```
Search anime by keyword.

| Param | Type | Required | Default |
|---|---|---|---|
| `keyword` | string | Yes | - |
| `page` | number | No | `1` |

### Search Suggestions
```
GET /api/search/suggest?keyword={keyword}
```

### Episodes
```
GET /api/episodes/{anime-slug}
```
Returns episode list for an anime.

### Stream
```
GET /api/stream?id={episode-id}
```
Returns available servers and links for an episode.

### Schedule
```
GET /api/schedule?date={YYYY-MM-DD}
```

### Spotlight
```
GET /api/spotlight
```

### Trending
```
GET /api/trending
```

### Top 10
```
GET /api/top-ten
```
Returns top anime for day, week, and month.

### Suggestions
```
GET /api/suggestions?keyword={keyword}
```

### Random
```
GET /api/random
```

### Most Popular
```
GET /api/most-popular?page={page}
```

### Filter
```
GET /api/filter?genre={genre}&type={type}&status={status}&sort={sort}&page={page}
```

| Param | Type | Options |
|---|---|---|
| `keyword` | string | Any search term |
| `genre` | string | action, comedy, fantasy, etc. |
| `type` | string | tv, movie, ova, ona, special, music |
| `status` | string | currently-airing, finished-airing, not-yet-aired |
| `language` | string | sub, dub |
| `rating` | string | g, pg, pg-13, r, r+, rx |
| `sort` | string | default, updated, added, score, name, release, views |
| `season` | string | spring, summer, fall, winter |
| `year` | number | 2024, 2025, etc. |
| `page` | number | Page number |

### Categories
```
GET /api/{category}?page={page}
```

**Available categories:**
- `genre/action`, `genre/comedy`, `genre/fantasy`, etc.
- `type/tv`, `type/movie`, `type/ova`, `type/ona`, `type/special`
- `status/currently-airing`, `status/finished-airing`, `status/not-yet-aired`

## Response Format

### Success
```json
{
  "success": true,
  "results": { ... }
}
```

### Error
```json
{
  "success": false,
  "message": "Error description"
}
```

## Project Structure

```
AniKatoAPI/
├── server.js                 # Express entry point
├── package.json
├── vercel.json               # Vercel config
├── public/
│   ├── index.html            # API docs page
│   └── 404.html
└── src/
    ├── configs/
    │   ├── dataUrl.js        # URL patterns
    │   └── header.config.js  # Request headers
    ├── controllers/          # Route handlers
    ├── extractors/           # HTML scrapers
    ├── helper/               # Cache, pagination utils
    └── routes/               # Express routes
```

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Scraper:** Cheerio + Axios
- **Deploy:** Vercel / Render / Docker

## Related Domains

- `anikototv.to`
- `anikoto.cz`
- `anikoto.me`
- `anikoto.net`
- `anikoto.se`

## License

[MIT](LICENSE)

## Author

**Sʜɪɴᴇɪ Nᴏᴜᴢᴇɴ** - [@Shineii86](https://github.com/Shineii86)
