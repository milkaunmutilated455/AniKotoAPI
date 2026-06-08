# Code Examples

> Working examples in cURL, JavaScript, and Python.

## cURL

### Get Homepage

```bash
curl https://anikototvapi.vercel.app/api
```

### Search Anime

```bash
curl "https://anikototvapi.vercel.app/api/search?keyword=naruto&page=1"
```

### Get Anime Info

```bash
curl "https://anikototvapi.vercel.app/api/info?id=naruto-shippuden"
```

### Get Episodes

```bash
curl "https://anikototvapi.vercel.app/api/episodes/naruto-shippuden"
```

### Get Servers

```bash
curl "https://anikototvapi.vercel.app/api/servers?ids=SlNVT25..."
```

### Get Stream URL

```bash
curl "https://anikototvapi.vercel.app/api/stream?id=MTF1dkFtaW9..."
```

### Get Schedule

```bash
curl "https://anikototvapi.vercel.app/api/schedule"
curl "https://anikototvapi.vercel.app/api/schedule?date=2026-06-08"
```

### Filter by Genre

```bash
curl "https://anikototvapi.vercel.app/api/filter?keyword=&genre[]=1&genre[]=4"
```

### Get Genre Anime

```bash
curl "https://anikototvapi.vercel.app/api/genre/action"
```

---

## JavaScript (Fetch API)

### Get Homepage

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api");
const data = await res.json();
console.log(data.results);
```

### Search Anime

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api/search?keyword=naruto");
const data = await res.json();
data.results.data.forEach(anime => {
  console.log(anime.title);
});
```

### Get Anime Info

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api/info?id=naruto-shippuden");
const data = await res.json();
console.log(data.results.title);
console.log(data.results.synopsis);
```

### Get Episodes

```javascript
const res = await fetch("https://anikototvapi.vercel.app/api/episodes/naruto-shippuden");
const data = await res.json();
data.results.episodes.forEach(ep => {
  console.log(`Episode ${ep.episode_no} - ID: ${ep.id}`);
});
```

### Full Streaming Flow

```javascript
const BASE = "https://anikototvapi.vercel.app/api";

async function getStream(slug, episodeNum) {
  // 1. Get episodes
  const epsRes = await fetch(`${BASE}/episodes/${slug}`);
  const eps = await epsRes.json();
  const ep = eps.results.episodes.find(e => e.episode_no === episodeNum);
  
  // 2. Get servers
  const srvRes = await fetch(`${BASE}/servers?ids=${ep.server_ids}`);
  const srvs = await srvRes.json();
  const server = srvs.results[0];
  
  // 3. Get stream
  const streamRes = await fetch(`${BASE}/stream?id=${server.link_id}`);
  const stream = await streamRes.json();
  
  return stream.results;
}

// Usage
getStream("naruto-shippuden", 1).then(stream => {
  console.log("URL:", stream.url);
  videoPlayer.src = stream.url;
});
```

### Search with Suggestions

```javascript
// Get autocomplete suggestions
const res = await fetch("https://anikototvapi.vercel.app/api/search/suggest?keyword=dea");
const suggestions = await res.json();
suggestions.results.forEach(s => console.log(s.title));
```

---

## Python (requests)

### Get Homepage

```python
import requests

r = requests.get("https://anikototvapi.vercel.app/api")
data = r.json()
print(data["results"])
```

### Search Anime

```python
import requests

r = requests.get("https://anikototvapi.vercel.app/api/search", params={"keyword": "naruto"})
data = r.json()
for anime in data["results"]["data"]:
    print(anime["title"])
```

### Get Anime Info

```python
import requests

r = requests.get("https://anikototvapi.vercel.app/api/info", params={"id": "naruto-shippuden"})
data = r.json()
print(data["results"]["title"])
print(data["results"]["synopsis"])
```

### Get Episodes

```python
import requests

r = requests.get("https://anikototvapi.vercel.app/api/episodes/naruto-shippuden")
data = r.json()
for ep in data["results"]["episodes"]:
    print(f"Episode {ep['episode_no']} - ID: {ep['id']}")
```

### Full Streaming Flow

```python
import requests

BASE = "https://anikototvapi.vercel.app/api"

def get_stream(slug, episode_num):
    # 1. Get episodes
    eps = requests.get(f"{BASE}/episodes/{slug}").json()
    ep = next(e for e in eps["results"]["episodes"] if e["episode_no"] == episode_num)
    
    # 2. Get servers
    srvs = requests.get(f"{BASE}/servers", params={"ids": ep["server_ids"]}).json()
    server = srvs["results"][0]
    
    # 3. Get stream
    stream = requests.get(f"{BASE}/stream", params={"id": server["link_id"]}).json()
    
    return stream["results"]

# Usage
stream = get_stream("naruto-shippuden", 1)
print(f"URL: {stream['url']}")
```

### Filter by Genre

```python
import requests

r = requests.get("https://anikototvapi.vercel.app/api/filter", params={
    "keyword": "",
    "genre[]": [1, 4]  # Action, Comedy
})
data = r.json()
```

### Get Schedule

```python
import requests

r = requests.get("https://anikototvapi.vercel.app/api/schedule")
data = r.json()
```

---

## Node.js (axios)

### Search Anime

```javascript
const axios = require("axios");

const { data } = await axios.get("https://anikototvapi.vercel.app/api/search", {
  params: { keyword: "naruto" }
});
console.log(data.results.data);
```

### Full Streaming Flow

```javascript
const axios = require("axios");

const BASE = "https://anikototvapi.vercel.app/api";

async function getStream(slug, episodeNum) {
  const { data: eps } = await axios.get(`${BASE}/episodes/${slug}`);
  const ep = eps.results.episodes.find(e => e.episode_no === episodeNum);
  
  const { data: srvs } = await axios.get(`${BASE}/servers`, { params: { ids: ep.server_ids } });
  const server = srvs.results[0];
  
  const { data: stream } = await axios.get(`${BASE}/stream`, { params: { id: server.link_id } });
  
  return stream.results;
}
```

---

## cURL (with jq)

### Pretty Print Homepage

```bash
curl -s https://anikototvapi.vercel.app/api | jq '.results.trending[:3]'
```

### Search and Extract Titles

```bash
curl -s "https://anikototvapi.vercel.app/api/search?keyword=naruto" | jq '.results.data[].title'
```

### Get Stream URL Only

```bash
curl -s "https://anikototvapi.vercel.app/api/stream?id=MTF1dkFtaW9..." | jq -r '.results.url'
```
