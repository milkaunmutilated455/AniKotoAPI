const BASE_URL = "https://anikototv.to";
const ALT_DOMAINS = [
  "https://anikoto.cz",
  "https://anikoto.me",
  "https://anikototv.to",
  "https://anikoto.net",
  "https://anikoto.se"
];

const URLS = {
  home: `${BASE_URL}/home`,
  search: `${BASE_URL}/filter`,
  genre: (genre) => `${BASE_URL}/genre/${genre}`,
  type: (type) => `${BASE_URL}/type/${type}`,
  status: (status) => `${BASE_URL}/status/${status}`,
  azList: (letter) => `${BASE_URL}/az-list/${letter}`,
  watch: (slug) => `${BASE_URL}/watch/${slug}`,
  episode: (slug, ep) => `${BASE_URL}/watch/${slug}/ep-${ep}`,
  latestUpdated: `${BASE_URL}/latest-updated`,
  newRelease: `${BASE_URL}/new-release`,
  mostViewed: `${BASE_URL}/most-viewed`,
  random: `${BASE_URL}/random`,
  serverList: `${BASE_URL}/ajax/server/list`
};

export { BASE_URL, ALT_DOMAINS, URLS };