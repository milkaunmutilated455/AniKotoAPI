# API Endpoints Reference

> Complete documentation for all AniKotoAPI endpoints.

**Base URL:** `https://anikototvapi.vercel.app/api`

---

## Table of Contents

- [Home](#home)
- [Search](#search)
- [Search Suggestions](#search-suggestions)
- [Anime Info](#anime-info)
- [Episodes](#episodes)
- [Episodes AJAX](#episodes-ajax)
- [Watch Page](#watch-page)
- [Stream Info](#stream-info)
- [Server List](#server-list)
- [Mapper Servers](#mapper-servers)
- [Schedule](#schedule)
- [Spotlight](#spotlight)
- [Trending](#trending)
- [Top 10](#top-10)
- [Most Popular](#most-popular)
- [New Release](#new-release)
- [Newly Added](#newly-added)
- [Random](#random)
- [Filter](#filter)
- [Suggestions](#suggestions)
- [Trending Sidebar](#trending-sidebar)
- [Seasons](#seasons)
- [Watch Order](#watch-order)
- [A-Z List](#a-z-list)
- [Genre](#genre)
- [Type](#type)
- [Status](#status)

---

## Home

Get homepage data including spotlight, trending, popular, top-airing, genres, and more.

```
GET /api/
```

**Parameters:** None

**Example:**

```bash
curl https://anikototvapi.vercel.app/api
```

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api");
const data = await res.json();
```

```python
import requests
r = requests.get("https://anikototvapi.vercel.app/api")
data = r.json()
```

**Response:**

```json
{
  "success": true,
  "results": {
    "spotlight": [...],
    "trending": [...],
    "popular": [...],
    "topAiring": [...],
    "genres": [...]
  }
}
```

---

## Search

Search for anime by keyword with pagination.

```
GET /api/search
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `keyword` | string | Yes | — | Search query |
| `page` | number | No | 1 | Page number |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/search?keyword=naruto&page=1"
```

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api/search?keyword=naruto");
const data = await res.json();
```

```python
import requests
r = requests.get("https://anikototvapi.vercel.app/api/search", params={"keyword": "naruto"})
data = r.json()
```

**Response:**

```json
{
  "success": true,
  "results": {
    "totalPages": 10,
    "data": [
      {
        "title": "Naruto",
        "id": "naruto-xxxxx",
        "slug": "naruto-xxxxx/ep-1",
        "image": "https://...",
        "type": "TV",
        "genres": ["Action", "Adventure"]
      }
    ]
  }
}
```

---

## Search Suggestions

Get autocomplete suggestions for search queries.

```
GET /api/search/suggest
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keyword` | string | Yes | Partial search query |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/search/suggest?keyword=dea"
```

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api/search/suggest?keyword=dea");
const data = await res.json();
```

```python
import requests
r = requests.get("https://anikototvapi.vercel.app/api/search/suggest", params={"keyword": "dea"})
data = r.json()
```

**Response:**

```json
{
  "success": true,
  "results": [
    { "title": "Death Note", "slug": "death-note-xxxxx" },
    { "title": "Deadman Wonderland", "slug": "deadman-wonderland-xxxxx" }
  ]
}
```

---

## Anime Info

Get detailed information about a specific anime.

```
GET /api/info
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Anime slug |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/info?id=naruto-shippuden"
```

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api/info?id=naruto-shippuden");
const data = await res.json();
```

```python
import requests
r = requests.get("https://anikototvapi.vercel.app/api/info", params={"id": "naruto-shippuden"})
data = r.json()
```

**Response:**

```json
{
  "success": true,
  "results": {
    "title": "Naruto: Shippuuden",
    "japaneseTitle": "ナルト- 疾風伝",
    "image": "https://...",
    "synopsis": "...",
    "type": "TV",
    "status": "Finished Airing",
    "totalEpisodes": 500,
    "genres": ["Action", "Adventure"],
    "malId": 1735,
    "relations": [...],
    "recommendations": [...]
  }
}
```

---

## Episodes

Get the episode list for an anime.

```
GET /api/episodes/:id
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Anime slug (path parameter) |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/episodes/naruto-shippuden"
```

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api/episodes/naruto-shippuden");
const data = await res.json();
```

```python
import requests
r = requests.get("https://anikototvapi.vercel.app/api/episodes/naruto-shippuden")
data = r.json()
```

**Response:**

```json
{
  "success": true,
  "results": {
    "animeId": 12345,
    "slug": "naruto-shippuden",
    "totalEpisodes": 500,
    "episodes": [
      {
        "id": "110289",
        "episode_no": 1,
        "slug": "1",
        "title": "",
        "active": true,
        "href": "#",
        "server_ids": "SlNVT25...",
        "timestamp": "1729249503",
        "mal_id": "1735"
      }
    ]
  }
}
```

---

## Episodes AJAX

Get the AJAX-loaded episode list (same data as episodes, but fetched via AJAX endpoint).

```
GET /api/episodes-ajax/:id
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Anime ID (numeric, from episodes response) |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/episodes-ajax/12345"
```

---

## Watch Page

Get watch page data for a specific episode.

```
GET /api/watch
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Anime slug |
| `ep` | number | No | Episode number |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/watch?id=naruto-shippuden&ep=1"
```

---

## Stream Info

Get the streaming URL and metadata for an episode server.

```
GET /api/stream
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Server link ID (from servers response) |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/stream?id=MTF1dkFtaW9..."
```

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api/stream?id=MTF1dkFtaW9...");
const data = await res.json();
```

```python
import requests
r = requests.get("https://anikototvapi.vercel.app/api/stream", params={"id": "MTF1dkFtaW9..."})
data = r.json()
```

**Response:**

```json
{
  "success": true,
  "results": {
    "linkId": "MTF1dkFtaW9...",
    "url": "https://megaplay.buzz/stream/s-5/94736/sub",
    "skipData": {
      "intro": [0, 0],
      "outro": [0, 0]
    }
  }
}
```

---

## Server List

Get available streaming servers for an episode.

```
GET /api/servers
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ids` | string | Yes | Server IDs (from episodes response `server_ids` field) |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/servers?ids=SlNVT25..."
```

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api/servers?ids=SlNVT25...");
const data = await res.json();
```

```python
import requests
r = requests.get("https://anikototvapi.vercel.app/api/servers", params={"ids": "SlNVT25..."})
data = r.json()
```

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "type": "sub",
      "ep_id": "110289",
      "link_id": "MTF1dkFtaW9...",
      "cmid": "animixplay-xxxxx",
      "sv_id": "323",
      "name": "HD-1"
    },
    {
      "type": "sub",
      "ep_id": "110289",
      "link_id": "MTF1dkFtaW9...",
      "cmid": "animixplay-xxxxx",
      "sv_id": "e54",
      "name": "Vidstream-2"
    }
  ]
}
```

---

## Mapper Servers

Get alternative streaming servers from the nekostream mapper API.

```
GET /api/mapper-servers
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `malId` | number | Yes | MyAnimeList ID |
| `slug` | string | Yes | Anime slug |
| `timestamp` | string | Yes | Episode timestamp |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/mapper-servers?malId=1735&slug=naruto-shippuden&timestamp=1729249503"
```

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "provider": "vidstreaming",
      "type": "sub",
      "url": "https://...",
      "download": "https://..."
    }
  ]
}
```

---

## Schedule

Get anime airing schedule.

```
GET /api/schedule
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `date` | string | No | Today | Date in YYYY-MM-DD format |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/schedule"
curl "https://anikototvapi.vercel.app/api/schedule?date=2026-06-08"
```

---

## Spotlight

Get spotlight/featured anime carousel.

```
GET /api/spotlight
```

**Parameters:** None

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/spotlight"
```

---

## Trending

Get currently trending anime.

```
GET /api/trending
```

**Parameters:** None

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/trending"
```

---

## Top 10

Get top 10 ranked anime (today, week, month).

```
GET /api/top-ten
```

**Parameters:** None

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/top-ten"
```

---

## Most Popular

Get most popular anime list.

```
GET /api/most-popular
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | No | 1 | Page number |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/most-popular?page=1"
```

---

## New Release

Get recently released episodes.

```
GET /api/new-release
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | No | 1 | Page number |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/new-release"
```

---

## Newly Added

Get newly added anime series.

```
GET /api/newly-added
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | No | 1 | Page number |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/newly-added"
```

---

## Random

Get random anime information.

```
GET /api/random
```

**Parameters:** None

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/random"
```

---

## Filter

Filter anime by genre, type, status, season, and more.

```
GET /api/filter
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keyword` | string | Yes | Search keyword (can be empty) |
| `genre[]` | number | No | Genre IDs (multiple supported) |
| `type[]` | number | No | Type IDs (multiple supported) |
| `status[]` | number | No | Status IDs (multiple supported) |
| `sort` | string | No | Sort order |
| `season` | string | No | Season |
| `page` | number | No | Page number |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/filter?keyword=&genre[]=1&genre[]=4"
```

---

## Suggestions

Get anime suggestions by keyword.

```
GET /api/suggestions
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keyword` | string | Yes | Search keyword |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/suggestions?keyword=naruto"
```

---

## Trending Sidebar

Get trending sidebar widget data.

```
GET /api/trending-sidebar
```

**Parameters:** None

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/trending-sidebar"
```

---

## Seasons

Get season information for an anime.

```
GET /api/seasons/:id
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Anime ID (path parameter) |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/seasons/12345"
```

---

## Watch Order

Get recommended watch order for an anime.

```
GET /api/watch-order/:id
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Anime ID (path parameter) |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/watch-order/12345"
```

---

## A-Z List

Get anime listing alphabetically.

```
GET /api/az-list/:letter
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `letter` | string | Yes | Letter or "other" for non-alpha titles |

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/az-list/a"
curl "https://anikototvapi.vercel.app/api/az-list/other"
```

---

## Genre

Get anime by genre.

```
GET /api/genre/:name
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Genre slug |

**Available Genres:**

`action`, `adventure`, `cars`, `comedy`, `dementia`, `demons`, `drama`, `ecchi`, `fantasy`, `game`, `harem`, `historical`, `horror`, `isekai`, `josei`, `kids`, `magic`, `mahou-shoujo`, `martial-arts`, `mecha`, `military`, `music`, `mystery`, `parody`, `police`, `psychological`, `romance`, `samurai`, `school`, `sci-fi`, `seinen`, `shoujo`, `shoujo-ai`, `shounen`, `shounen-ai`, `slice-of-life`, `space`, `sports`, `super-power`, `supernatural`, `thriller`, `unknown`, `vampire`

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/genre/action"
```

---

## Type

Get anime by type.

```
GET /api/type/:name
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Type slug |

**Available Types:** `movie`, `music`, `ona`, `ova`, `special`, `tv`

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/type/tv"
```

---

## Status

Get anime by airing status.

```
GET /api/status/:name
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Status slug |

**Available Statuses:** `currently-airing`, `finished-airing`, `not-yet-aired`

**Example:**

```bash
curl "https://anikototvapi.vercel.app/api/status/currently-airing"
```
