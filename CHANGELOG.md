# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- Initial project setup
- Express.js server with Vercel deployment support
- Home page API endpoint (`/api/`)
- Anime info endpoint (`/api/info?id={anime-slug}`)
- Search endpoint (`/api/search?keyword={keyword}`)
- Search suggestions endpoint (`/api/search/suggest?keyword={keyword}`)
- Episode list endpoint (`/api/episodes/{anime-slug}`)
- Stream info endpoint (`/api/stream?id={episode-id}`)
- Schedule endpoint (`/api/schedule?date={YYYY-MM-DD}`)
- Spotlight endpoint (`/api/spotlight`)
- Trending endpoint (`/api/trending`)
- Top 10 endpoint (`/api/top-ten`)
- Suggestions endpoint (`/api/suggestions?keyword={keyword}`)
- Random anime endpoint (`/api/random`)
- Most popular endpoint (`/api/most-popular?page={page}`)
- Filter endpoint (`/api/filter?{params}`)
- Category endpoints (`/api/{category}?page={page}`)
- Caching system with 5-minute TTL
- CORS configuration with allowed origins
- Public HTML documentation page
- 404 error page
- Dockerfile for containerization
- Render.yaml for Render deployment
- MIT License
- README with API documentation

### Changed
- Updated all extractors to match actual anikototv.to HTML structure
- Changed ID-based lookups to slug-based lookups
- Updated URL patterns to match actual website structure
- Improved CSS selectors for better accuracy

## [1.1.0] - 2024-12-19

### Fixed
- Corrected HTML selectors based on actual website analysis
- Updated episode list extraction
- Fixed stream info endpoint to use AJAX server list
- Improved error handling