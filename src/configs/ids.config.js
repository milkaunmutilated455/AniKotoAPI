/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — ids.config.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Mapping configuration for anime metadata IDs used by the AniKoto
 *   site's filtering system. Contains human-readable slugs mapped
 *   to numeric IDs for genres, types, statuses, ratings, and sort options.
 *
 * @exports
 *   GENRE_IDS, TYPE_IDS, STATUS_IDS, RATING_IDS, SORT_IDS
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

// ══════════════════════════════════════════════════════════════
// GENRE ID MAPPING
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Genre slug to numeric ID mapping ----
/**
 * Maps human-readable genre slugs to their corresponding numeric IDs
 * used in AniKoto's filtering system. Contains 43 different anime genres
 * from action to vampire.
 *
 * @type {Object}
 * @property {string} action - ID for action genre
 * @property {string} adventure - ID for adventure genre
 * @property {string} comedy - ID for comedy genre
 * @property {string} drama - ID for drama genre
 * @property {string} fantasy - ID for fantasy genre
 * @property {string} horror - ID for horror genre
 * @property {string} romance - ID for romance genre
 * @property {string} sci-fi - ID for science fiction genre
 * @property {string} slice-of-life - ID for slice of life genre
 * @property {string} supernatural - ID for supernatural genre
 *
 * @example
 *   // Get genre ID for filtering
 *   GENRE_IDS["action"] // "1"
 *   GENRE_IDS["comedy"] // "4"
 */
const GENRE_IDS = {
  "action": "1",
  "adventure": "2",
  "cars": "3",
  "comedy": "4",
  "dementia": "5",
  "demons": "6",
  "drama": "7",
  "ecchi": "8",
  "fantasy": "9",
  "game": "10",
  "harem": "11",
  "historical": "12",
  "horror": "13",
  "isekai": "14",
  "josei": "15",
  "kids": "16",
  "magic": "17",
  "mahou-shoujo": "18",
  "martial-arts": "19",
  "mecha": "20",
  "military": "21",
  "music": "22",
  "mystery": "23",
  "parody": "24",
  "police": "25",
  "psychological": "26",
  "romance": "27",
  "samurai": "28",
  "school": "29",
  "sci-fi": "30",
  "seinen": "31",
  "shoujo": "32",
  "shoujo-ai": "33",
  "shounen": "34",
  "shounen-ai": "35",
  "slice-of-life": "36",
  "space": "37",
  "sports": "38",
  "super-power": "39",
  "supernatural": "40",
  "thriller": "41",
  "unknown": "42",
  "vampire": "43"
};

// ══════════════════════════════════════════════════════════════
// ANIME TYPE ID MAPPING
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Anime type slug to numeric ID mapping ----
/**
 * Maps anime type slugs to their corresponding numeric IDs.
 * Covers all standard anime format types including TV series,
 * movies, OVAs, ONAs, and special episodes.
 *
 * @type {Object}
 * @property {string} movie - ID for movie format
 * @property {string} music - ID for music video format
 * @property {string} ona - ID for Original Net Animation
 * @property {string} ova - ID for Original Video Animation
 * @property {string} special - ID for special episodes
 * @property {string} tv - ID for TV broadcast series
 *
 * @example
 *   // Get type ID for filtering
 *   TYPE_IDS["tv"] // "6"
 *   TYPE_IDS["movie"] // "1"
 */
const TYPE_IDS = {
  "movie": "1",
  "music": "2",
  "ona": "3",
  "ova": "4",
  "special": "5",
  "tv": "6"
};

// ══════════════════════════════════════════════════════════════
// AIRING STATUS ID MAPPING
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Airing status slug to numeric ID mapping ----
/**
 * Maps anime airing status slugs to their corresponding numeric IDs.
 * Used to filter anime by their broadcast completion status.
 *
 * @type {Object}
 * @property {string} currently-airing - ID for ongoing series
 * @property {string} finished-airing - ID for completed series
 * @property {string} not-yet-aired - ID for upcoming series
 *
 * @example
 *   // Get status ID for filtering
 *   STATUS_IDS["currently-airing"] // "1"
 */
const STATUS_IDS = {
  "currently-airing": "1",
  "finished-airing": "2",
  "not-yet-aired": "3"
};

// ══════════════════════════════════════════════════════════════
// AGE RATING ID MAPPING
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Age rating slug to numeric ID mapping ----
/**
 * Maps age rating slugs to their corresponding numeric IDs.
 * Follows standard anime age rating classifications from
 * general audience to restricted content.
 *
 * @type {Object}
 * @property {string} g - ID for General Audiences
 * @property {string} pg - ID for Parental Guidance
 * @property {string} pg-13 - ID for Parents Strongly Cautioned
 * @property {string} r - ID for Restricted
 * @property {string} r+ - ID for Restricted Plus
 * @property {string} rx - ID for Hentai (Adult)
 *
 * @example
 *   // Get rating ID for filtering
 *   RATING_IDS["pg-13"] // "3"
 */
const RATING_IDS = {
  "g": "1",
  "pg": "2",
  "pg-13": "3",
  "r": "4",
  "r+": "5",
  "rx": "6"
};

// ══════════════════════════════════════════════════════════════
// SORT ORDER ID MAPPING
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Sort order slug to query parameter mapping ----
/**
 * Maps sort order slugs to their corresponding query parameter values.
 * Used with the filter/search endpoint to control result ordering.
 * Note: Default sort has empty string value.
 *
 * @type {Object}
 * @property {string} default - Default sort order (empty string)
 * @property {string} latest-updated - ID for most recently updated
 * @property {string} latest-added - ID for most recently added
 * @property {string} score - ID for highest rated
 * @property {string} name-az - ID for alphabetical order
 * @property {string} release-date - ID for newest release date
 * @property {string} most-viewed - ID for most popular
 * @property {string} number_of_episodes - ID for episode count
 *
 * @example
 *   // Get sort parameter value
 *   SORT_IDS["latest-updated"] // "1"
 *   SORT_IDS["score"] // "3"
 */
const SORT_IDS = {
  "default": "",
  "latest-updated": "1",
  "latest-added": "2",
  "score": "3",
  "name-az": "4",
  "release-date": "5",
  "most-viewed": "6",
  "number_of_episodes": "7"
};

export { GENRE_IDS, TYPE_IDS, STATUS_IDS, RATING_IDS, SORT_IDS };
// ══════════════════════════════════════════════════════════════ END: ids.config.js