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
  search: `${BASE_URL}/search`,
  genre: (genre) => `${BASE_URL}/genre/${genre}`,
  azList: (letter) => `${BASE_URL}/az-list/${letter}`,
  category: (cat) => `${BASE_URL}/${cat}`,
  anime: (id) => `${BASE_URL}/anime/${id}`,
  episode: (id) => `${BASE_URL}/episode/${id}`,
  schedule: (date) => `${BASE_URL}/schedule/${date}`,
  topTen: `${BASE_URL}/top-ten`,
  mostPopular: `${BASE_URL}/most-popular`,
  mostFavorite: `${BASE_URL}/most-favorite`,
  recentlyUpdated: `${BASE_URL}/recently-updated`,
  recentlyAdded: `${BASE_URL}/recently-added`,
  subbedAnime: `${BASE_URL}/subbed-anime`,
  dubbedAnime: `${BASE_URL}/dubbed-anime`,
  movie: `${BASE_URL}/movie`,
  ova: `${BASE_URL}/ova`,
  ona: `${BASE_URL}/ona`,
  special: `${BASE_URL}/special`,
  tv: `${BASE_URL}/tv`,
  music: `${BASE_URL}/music`
};

export { BASE_URL, ALT_DOMAINS, URLS };