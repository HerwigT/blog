---
layout: ../../layouts/TilLayout.astro
title: 'Astro can serve a custom 404 on Cloudflare Workers'
pubDate: 2026-11-10
tags: ["astro", "cloudflare"]
---
Cloudflare Workers static assets return a bare 404 unless you name a page for missing URLs. Setting `not_found_handling` to `404-page` in `wrangler.jsonc` serves the built `dist/404.html`.

```jsonc
"assets": {
  "directory": "./dist",
  "not_found_handling": "404-page"
}
```
