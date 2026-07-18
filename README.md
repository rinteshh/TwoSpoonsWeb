# Two Spoons 🥄🥄

A funky, single-page bakery website for **Two Spoons** — savoury bites, sweet things and gifting bakes. Design inspired by [cobfoods.com](https://cobfoods.com/) (chunky retro type, playful marquees, bold colour blocks) but re-tuned to a bright, funky palette.

## Highlights

- **Hero + scrolling marquees** — announcement bar of live offers and a rolling word strip.
- **Chef's Specials** — Tres Leches, White Sauce Pasta and the Gochujang Korean Cheese Bun.
- **Offers** — the three deals, applied automatically in the cart:
  - 5% off on orders ₹500 and above
  - Free hazelnut cappuccino on orders ₹600 and above
  - 10% off on orders ₹800 and above
- **Filterable menu** — Everything / Savoury Bites / Sweet Tooth / Cookies & Gifting.
- **Working cart drawer** — add/remove items, live subtotal, auto discounts and perk tracker.
- **Reviews, story, newsletter and footer**, plus a fully responsive mobile layout.

## Run it

Any static file server works. For example:

```bash
python3 -m http.server 8899
# then open http://localhost:8899
```

Or just open `index.html` directly in a browser.

## Fonts

Cob uses the commercial fonts *Obviously* + *Subtil Grotesk*. Since those aren't free, the closest free Google Fonts stand-ins are used:

- **Archivo** at expanded width (`font-stretch: expanded`) — the wide, chunky display type (≈ Obviously)
- **Space Grotesk** — the warm grotesk body font (≈ Subtil)

## Images

Product photos are real food images pulled from **Wikimedia Commons** and saved locally in `images/`. To refresh or re-fetch them:

```bash
python3 tools/fetch_images.py
```

The mapping of each product to its search query lives in `tools/fetch_images.py`.

## Structure

```
index.html   # markup + section layout
styles.css   # funky theme, responsive rules
script.js    # menu data, rendering, filters, cart + offer logic
images/      # locally-hosted product photos
tools/       # image fetch script
```

> This is a front-end demo — checkout and newsletter signup are illustrative only.
