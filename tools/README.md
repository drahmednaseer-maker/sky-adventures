# Content tooling

One-off scripts used to migrate content off the original WordPress/WooCommerce site
(`skyadventures.com.pk`) into `src/lib/data.json`.

| File | Purpose |
| --- | --- |
| `extract2.py` | Parses saved product pages + the WP REST payload into structured products (stats, description blocks, day-by-day itinerary, gallery). |
| `gendata.py` | Builds `src/lib/data.json` — maps images to their optimised local paths, derives duration/difficulty/destination, cleans excerpts. |
| `optimize.mjs` | Converts the downloaded originals to WebP (max 1600px wide) and generates the inline blur placeholders. 30.1 MB → 10.6 MB. |
| `data/` | Cached intermediate JSON from the extraction run. |

These scripts expect the raw scrape (`tools/raw/`, `tools/pages/`) which is not committed —
they are kept for provenance and for re-running a migration, not as part of the build.
The site builds purely from `src/lib/data.json` and `public/img/`.
