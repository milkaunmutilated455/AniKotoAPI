# Streaming Flow Guide

> How to get streaming URLs from AniKotoAPI.

## Overview

The streaming flow involves 3 steps:

```
1. Get episodes     → /api/episodes/{slug}
2. Get servers      → /api/servers?ids={server_ids}
3. Get stream URL   → /api/stream?id={link_id}
```

## Step 1: Get Episodes

First, get the episode list for an anime. This returns episode data including `server_ids` needed for the next step.

```bash
curl "https://anikototvapi.vercel.app/api/episodes/naruto-shippuden"
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
        "server_ids": "SlNVT25JaFlCMnZOeXZ2aG5t...",
        "timestamp": "1729249503",
        "mal_id": "1735"
      }
    ]
  }
}
```

**Key fields:**
- `server_ids` — Base64-encoded string needed for the servers endpoint
- `timestamp` — Used for the mapper API
- `mal_id` — MyAnimeList ID for the anime

## Step 2: Get Servers

Use the `server_ids` from step 1 to get available streaming servers.

```bash
curl "https://anikototvapi.vercel.app/api/servers?ids=SlNVT25JaFlCMnZOeXZ2aG5t..."
```

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "type": "sub",
      "ep_id": "110289",
      "link_id": "MTF1dkFtaW9BRTZPbzJJRElFZUZr...",
      "cmid": "animixplay-xxxxx",
      "sv_id": "323",
      "name": "HD-1"
    },
    {
      "type": "sub",
      "ep_id": "110289",
      "link_id": "MTF1dkFtaW9BRTZPbzJJRElFZUZr...",
      "cmid": "animixplay-xxxxx",
      "sv_id": "e54",
      "name": "Vidstream-2"
    },
    {
      "type": "dub",
      "ep_id": "110289",
      "link_id": "MTF1dkFtaW9BRTZPbzJJRElFZUZr...",
      "cmid": "animixplay-xxxxx",
      "sv_id": "a41",
      "name": "VidCloud-1"
    }
  ]
}
```

**Key fields:**
- `type` — "sub" or "dub"
- `link_id` — ID needed for the stream endpoint
- `name` — Server name (HD-1, Vidstream-2, etc.)

## Step 3: Get Stream URL

Use the `link_id` from step 2 to get the actual streaming URL.

```bash
curl "https://anikototvapi.vercel.app/api/stream?id=MTF1dkFtaW9BRTZPbzJJRElFZUZr..."
```

**Response:**

```json
{
  "success": true,
  "results": {
    "linkId": "MTF1dkFtaW9BRTZPbzJJRElFZUZr...",
    "url": "https://megaplay.buzz/stream/s-5/94736/sub",
    "skipData": {
      "intro": [0, 0],
      "outro": [0, 0]
    }
  }
}
```

**Key fields:**
- `url` — Direct streaming URL (m3u8 or mp4)
- `skipData` — Intro/outro timestamps for skipping

## Complete Example (JavaScript)

```javascript
const BASE = "https://anikototvapi.vercel.app/api";

async function getStreamUrl(animeSlug, episodeNumber) {
  // Step 1: Get episodes
  const epsRes = await fetch(`${BASE}/episodes/${animeSlug}`);
  const epsData = await epsRes.json();
  const episode = epsData.results.episodes.find(
    ep => ep.episode_no === episodeNumber
  );
  
  if (!episode) throw new Error("Episode not found");
  
  // Step 2: Get servers
  const srvRes = await fetch(`${BASE}/servers?ids=${episode.server_ids}`);
  const srvData = await srvRes.json();
  const server = srvData.results.find(s => s.type === "sub") || srvData.results[0];
  
  if (!server) throw new Error("No servers available");
  
  // Step 3: Get stream URL
  const streamRes = await fetch(`${BASE}/stream?id=${server.link_id}`);
  const streamData = await streamRes.json();
  
  return streamData.results;
}

// Usage
getStreamUrl("naruto-shippuden", 1)
  .then(stream => {
    console.log("Stream URL:", stream.url);
    console.log("Skip intro at:", stream.skipData.intro[0]);
  });
```

## Complete Example (Python)

```python
import requests

BASE = "https://anikototvapi.vercel.app/api"

def get_stream_url(anime_slug, episode_number):
    # Step 1: Get episodes
    eps_res = requests.get(f"{BASE}/episodes/{anime_slug}")
    eps_data = eps_res.json()
    episode = next(
        ep for ep in eps_data["results"]["episodes"]
        if ep["episode_no"] == episode_number
    )
    
    # Step 2: Get servers
    srv_res = requests.get(f"{BASE}/servers", params={"ids": episode["server_ids"]})
    srv_data = srv_res.json()
    server = next(
        (s for s in srv_data["results"] if s["type"] == "sub"),
        srv_data["results"][0]
    )
    
    # Step 3: Get stream URL
    stream_res = requests.get(f"{BASE}/stream", params={"id": server["link_id"]})
    stream_data = stream_res.json()
    
    return stream_data["results"]

# Usage
stream = get_stream_url("naruto-shippuden", 1)
print(f"Stream URL: {stream['url']}")
print(f"Skip intro at: {stream['skipData']['intro'][0]}")
```

## Alternative: Mapper Servers

For additional streaming sources, use the mapper API with `malId`, `slug`, and `timestamp` from the episodes response.

```bash
curl "https://anikototvapi.vercel.app/api/mapper-servers?malId=1735&slug=naruto-shippuden&timestamp=1729249503"
```

This returns alternative providers like VidStreaming, Gogoanime, etc.

## Notes

- The `url` in stream response is typically an m3u8 playlist or direct mp4 link
- `skipData` contains intro/outro timestamps in seconds
- Some servers may require specific headers or referrers to work
- The mapper API is external and may not always be available
